import { define } from "../utils/object.js";
import { noop } from "../utils/function.js";

// Match execution state to resolver function
const matchWith = (pattern, state) => {
  if (state.name in pattern) {
    // this works because Cancelled doesn't take an argument, so it's fine if state.reason is undefined
    return pattern[state.name]("value" in state ? state.value : state.reason);
  }
  throw new Error(`${state.name} not found in pattern`);
};

// Execution states
const { Pending, Cancelled, Rejected, Resolved } = {
  Pending: () => ({ name: "Pending" }),
  Cancelled: () => ({ name: "Cancelled" }),
  Rejected: (reason) => ({ name: "Rejected", reason }),
  Resolved: (value) => ({ name: "Resolved", value }),
};

const describeState = (state) =>
  matchWith(
    {
      Pending: (_) => "Pending",
      Cancelled: (_) => "Cancelled",
      Rejected: (_) => "Rejected",
      Resolved: (_) => "Resolved",
    },
    state
  );

const moveToState = (deferred, newState) => {
  deferred._state = newState;
  const listeners = deferred.listeners;
  for (let listener of listeners) {
    matchWith(
      {
        Cancelled: () => listener.onCancelled(),
        Rejected: (reason) => listener.onRejected(reason),
        Resolved: (value) => listener.onResolved(value),
      },
      deferred.state
    );
  }
};

class Deferred {
  _state = null;
  _listeners = [];

  constructor() {
    define(this, "_state", Pending());
    define(this, "_listeners", []);
  }

  resolve(value) {
    moveToState(this, Resolved(value));
    return this;
  }

  reject(reason) {
    moveToState(this, Rejected(reason));
    return this;
  }

  cancel() {
    moveToState(this, Cancelled());
    return this;
  }

  maybeCancel() {
    if (this._state.name === "Pending") {
      moveToState(this, Cancelled());
    }
    return this;
  }

  listen(pattern) {
    matchWith(
      {
        Pending: () => this.listeners.push(pattern),
        Cancelled: () => pattern.onCancelled() ?? noop,
        Rejected: (reason) => pattern.onRejected(reason),
        Resolved: (value) => pattern.onResolved(value),
      },
      this.state
    );
    return this;
  }
}

export class Future extends Deferred {
  constructor() {
    super();
    Object.defineProperty(this, "kind", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: "Future",
    });
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
  }

  get listeners() {
    return this._listeners;
  }

  set listeners(arr) {
    this._listeners = arr;
  }

  // f should return a Future
  chain(f) {
    const result = new Future();
    this.listen({
      onCancelled: () => result.cancel(),
      onRejected: (reason) => result.reject(reason),
      onResolved: (value) => {
        f(value).listen({
          onCancelled: () => result.cancel(),
          onRejected: (reason) => result.reject(reason),
          onResolved: (value2) => result.resolve(value2),
        });
      },
    });
    return result;
  }

  map(f) {
    const result = new Future();
    this.listen({
      onCancelled: () => result.cancel(),
      onRejected: (reason) => result.reject(reason),
      onResolved: (value) => result.resolve(f(value)),
    });
    return result;
  }

  mapRejected(f) {
    const reject = new Future();
    this.listen({
      onCancelled: () => reject.cancel(),
      onRejected: (reason) => reject.reject(f(reason)),
      onResolved: (value) => reject.resolve(value),
    });
    return reject;
  }

  bimap(rejectF, resolveF) {
    const mapped = new Future();
    this.listen({
      onCancelled: () => mapped.cancel(),
      onRejected: (reason) => mapped.reject(rejectF(reason)),
      onResolved: (value) => mapped.resolve(resolveF(value)),
    });
    return mapped;
  }

  fork({ onCancelled = noop, onRejected, onResolved }) {
    switch (this.state.name) {
      case "Pending":
        throw new Error("Future is still pending");
      case "Cancelled":
        return onCancelled();
      case "Rejected":
        return onRejected(this.state.reason);
      case "Resolved":
        return onResolved(this.state.value);
      default:
        throw new Error("Unknown state");
    }
  }

  fold({ onCancelled = noop, onRejected, onResolved }) {
    return this.fork({ onCancelled, onRejected, onResolved });
  }

  ap(other) {
    return other.chain((f) => this.map(f));
  }

  finalize(pred, val) {
    return pred(val) ? this.resolve(val) : this.reject(val);
  }

  // Function order is changed for parity with Promise interface
  then(resolveF, rejectF = noop) {
    return this.listen({
      onCancelled: noop,
      onRejected: rejectF,
      onResolved: resolveF,
    });
  }

  catch(rejectF) {
    return this.listen({
      onCancelled: noop,
      onRejected: rejectF,
      onResolved: noop,
    });
  }

  finally(fn) {
    return this.listen({
      onCancelled: fn,
      onRejected: fn,
      onResolved: fn,
    });
  }

  promise() {
    return new Promise((resolve, reject) => {
      this.listen({
        onCancelled: () => reject(Cancelled()),
        onRejected: (reason) => reject(reason),
        onResolved: (value) => resolve(value),
      });
    });
  }

  toString() {
    return `Future: ${describeState(this.state)}, ${
      this.listeners.length
    } listeners`;
  }

  inspect() {
    return this.toString();
  }

  isPending() {
    return this.state === "Pending";
  }

  isCancelled() {
    return this.state === "Cancelled";
  }

  isRejected() {
    return this.state === "Rejected";
  }

  isResolved() {
    return this.state === "Resolved";
  }

  isFuture() {
    return true;
  }
}

export const future = ({ onCancelled = noop, onRejected, onResolved }) => {
  return new Future().listen({
    onCancelled: () => onCancelled(),
    onRejected: (reason) => onRejected(reason),
    onResolved: (value) => onResolved(value),
  });
};

Future.isFuture = (obj) => typeof obj.isFuture === "function" && obj.isFuture();

Future.of = (value) => {
  return new Future().resolve(value);
};

Future.rejected = (reason) => {
  return new Future().reject(reason);
};

Future.fromPromise = (promise) => {
  let deferred = new Future();
  promise.then(
    (value) => deferred.resolve(value),
    (error) => deferred.reject(error)
  );
  return deferred;
};

Future.fromCallback =
  (fn) =>
  (...args) => {
    let deferred = new Future();
    fn(...args, (err, data) => {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(data);
      }
    });
    return deferred;
  };

// For parity with Promise interface
Future.resolve = Future.of;
Future.reject = Future.rejected;

Future.all = (futures) => {
  let results = [];
  let all = new Future();
  for (let future of futures) {
    future.listen({
      onCancelled: () => future.cancel(),
      onRejected: (reason) => all.reject(reason),
      onResolved: (value) => results.push(value),
    });
  }
  return all.listen({
    onCancelled: () => all.cancel(),
    onRejected: (reason) => all.reject(reason),
    onResolved: () => all.resolve(futures.constructor(...results)),
  });
};

Future.allSettled = (futures) => {
  let results = [];
  let all = new Future();
  for (let future of futures) {
    future.listen({
      onCancelled: () => future.cancel(),
      onRejected: (reason) => results.push(reason),
      onResolved: (value) => results.push(value),
    });
  }
  return all.listen({
    onCancelled: () => all.cancel(),
    onRejected: (reason) => all.reject(reason),
    onResolved: () => all.resolve(futures.constructor(...results)),
  });
};

Future.any = (futures) => {
  let errors = [];
  let any = new Future();
  for (let future of futures) {
    future.listen({
      onCancelled: () => future.cancel(),
      onRejected: (reason) => errors.push(reason),
      onResolved: (value) => {
        if (any.state === "Pending") {
          return any.resolve(value);
        }
      },
    });
  }
  return any.listen({
    onCancelled: () => any.cancel(),
    onRejected: () => any.reject(futures.constructor(...errors)),
    onResolved: (value) => any.resolve(value),
  });
};

Future.race = (futures) => {
  let race = new Future();
  for (let future of futures) {
    future.listen({
      onCancelled: () => future.cancel(),
      onRejected: (reason) => {
        if (race.state === "Pending") {
          return race.reject(reason);
        }
      },
      onResolved: (value) => {
        if (race.state === "Pending") {
          return race.resolve(value);
        }
      },
    });
    return race.listen({
      onCancelled: () => race.cancel(),
      onRejected: (reason) => race.cancel(reason),
      onResolved: (value) => race.resolve(value),
    });
  }
};

const f = new Future().listen({
  onCancelled: () => {},
  onRejected: () => {},
  onResolved: () => console.log("Hello"),
});

console.log(f);
console.log(f.listeners);

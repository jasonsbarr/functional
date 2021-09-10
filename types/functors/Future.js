import { define } from "../utils/object.js";
import { noop } from "../utils/functions.js";
import axios from "axios";

// Match execution state to resolver function
const matchWith = (pattern, state) => {
  if (state.name in pattern) {
    // this works because Cancelled doesn't take an argument, so undefined for it is fine
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
}

export class Future extends Deferred {
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

  finalize(pred, val) {
    return pred(val) ? this.resolve(val) : this.reject(val);
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
}

export const future = ({ onCancelled = noop, onRejected, onResolved }) => {
  return new Future().listen({
    onCancelled: () => onCancelled(),
    onRejected: (reason) => onRejected(reason),
    onResolved: (value) => onResolved(value),
  });
};

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
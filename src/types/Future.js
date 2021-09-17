import { noop } from "../functions/helpers/noop.js";
import { Cancelled } from "./_executionStates.js";
import { Deferred } from "./_deferred.js";
import { length } from "../functions/iterable/length.js";
import { defer } from "../functions/lambda/defer.js";

class Futur extends Deferred {
  constructor() {
    super();
    Object.defineProperty(this, "kind", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: "Future",
    });
  }

  // f should return a Future
  chain(f) {
    const result = new Futur();
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
    const result = new Futur();
    this.listen({
      onCancelled: () => result.cancel(),
      onRejected: (reason) => result.reject(reason),
      onResolved: (value) => result.resolve(f(value)),
    });
    return result;
  }

  mapRejected(f) {
    const reject = new Futur();
    this.listen({
      onCancelled: () => reject.cancel(),
      onRejected: (reason) => reject.reject(f(reason)),
      onResolved: (value) => reject.resolve(value),
    });
    return reject;
  }

  bimap(rejectF, resolveF) {
    const mapped = new Futur();
    this.listen({
      onCancelled: () => mapped.cancel(),
      onRejected: (reason) => mapped.reject(rejectF(reason)),
      onResolved: (value) => mapped.resolve(resolveF(value)),
    });
    return mapped;
  }

  fork(onRejected, onResolved, onCancelled = noop) {
    return this.listen({ onCancelled, onRejected, onResolved });
  }

  ap(future) {
    return this.chain((f) => future.map(f));
  }

  finalize(pred, value, reason = null) {
    return pred(value) ? this.resolve(value) : this.reject(reason ?? value);
  }

  // Function order is changed for parity with Promise interface
  then(resolveF, rejectF = noop) {
    return this.fork(rejectF, resolveF);
  }

  catch(rejectF) {
    return this.fork(rejectF, noop);
  }

  finally(fn) {
    const final = new Futur();
    this.listen({
      onCancelled: () => final.cancel(),
      onRejected: () => final.reject(fn()),
      onResolved: () => final.resolve(fn()),
    });
    return final;
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
    return `Future: ${this.state.name}${
      this.state.value
        ? ", value = " + this.state.value.toString()
        : this.state.reason
        ? ", reason = " + this.state.reason.toString()
        : ""
    }`;
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

export const Future = () => {
  return new Futur();
};

Future.isFuture = (obj) => typeof obj.isFuture === "function" && obj.isFuture();

Future.of = (value) => {
  return new Futur().resolve(value);
};

Future.rejected = (reason) => {
  return new Futur().reject(reason);
};

Future.fromPromise = (promise) => {
  let f = new Futur();
  // for some reason, not returning from these callbacks makes it work
  promise.then(
    (value) => {
      f.resolve(value);
    },
    (error) => {
      f.reject(error);
    }
  );
  return f;
};

Future.fromCallback =
  (fn) =>
  (...args) => {
    let f = new Futur();
    fn(...args, (err, data) => {
      if (err) {
        f.reject(err);
      } else {
        f.resolve(data);
      }
    });
    return f;
  };

// For parity with Promise interface
Future.resolve = Future.of;
Future.reject = Future.rejected;

Future.all = (futures) => {
  const all = Future();
  let results = [];
  // Hack to keep the array alive throughout execution due to defer sticking the callback
  // in the task queue, whereas Promise callbacks go into the microtask queue. This
  // makes sure the method works as expected with Futures created from Promises.
  defer(async () => {
    // for await keeps function execution context alive long enough to resolve asynchronous actions
    // it's still asynchronous, so it doesn't block the main thread
    try {
      for await (let value of futures) {
        results.push(value);
      }
      all.resolve(futures.constructor(...results));
    } catch (e) {
      all.reject(e);
    }
  });
  // This return actually happens BEFORE the defer callback above runs. Isn't that neat?
  return all;
};

Future.allSettled = (futures) => {
  const all = Future();
  let results = [];
  defer(async () => {
    for (let future of futures) {
      try {
        // Hacky, but it works
        for await (let value of [future]) {
          results.push(value);
        }
      } catch (e) {
        results.push(e);
      }
    }
    all.resolve(futures.constructor(...results));
  });
  return all;
};

Future.any = (futures) => {
  const any = Future();
  let errors = [];
  defer(async () => {
    for (let future of futures) {
      try {
        for await (let value of [future]) {
          any.resolve(value);
        }
      } catch (e) {
        errors.push(e);
      }
      if (any.state.name === "Resolved") break;
    }
    if (length(errors) === length(futures)) {
      any.reject(new AggregateError(errors, "All Futures rejected"));
    }
  });
  return any;
};

Future.race = (futures) => {
  let race = Future();
  defer(async () => {
    try {
      for await (let value of futures) {
        if (race.state.name !== "Pending") break;
        race.resolve(value);
      }
    } catch (e) {
      if (race.state.name === "Pending") {
        race.reject(e);
      }
    }
  });
  return race;
};

export const future = (onRejected, onResolved, onCancelled = noop) =>
  Future().listen({ onRejected, onResolved, onCancelled });

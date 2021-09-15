/**
 * Implements Functor, Applicative, Monad, Bifunctor
 */

import { noop } from "../functions/helpers/noop.js";
import { Cancelled } from "./_executionStates.js";
import { Deferred } from "./_deferred.js";

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

  ap(future) {
    return this.chain((f) => future.map(f));
  }

  finalize(pred, value, reason = null) {
    return pred(value) ? this.resolve(value) : this.reject(reason ?? value);
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
    return `Future: ${this.state.name}, ${this.listeners.length} listeners`;
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

export const future = (onRejected, onResolved) => {
  return new Future().listen({
    onCancelled: () => noop(),
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
  let f = new Future();
  promise.then(
    (value) => f.resolve(value),
    (error) => f.reject(error)
  );
  return f;
};

Future.fromCallback =
  (fn) =>
  (...args) => {
    let f = new Future();
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

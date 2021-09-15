import { noop } from "../functions/helpers/noop.js";
import { Cancelled } from "./_executionStates.js";
import { Deferred } from "./_deferred.js";
import { length } from "../functions/iterable/iter.js";
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
    return this.bimap(rejectF, resolveF);
  }

  catch(rejectF) {
    return this.mapRejected(rejectF);
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

export const Future = (onRejected, onResolved, onCancelled = noop) => {
  return new Futur().listen({
    onCancelled: () => onCancelled(),
    onRejected: (reason) => onRejected(reason),
    onResolved: (value) => onResolved(value),
  });
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
  let all = new Futur();
  defer(() => {
    all._results = [];
    for (let future of futures) {
      future.listen({
        onCancelled: () => all.cancel(),
        onRejected: (reason) => all.reject(reason),
        onResolved: (value) => all._results.push(value),
      });
    }
    if (length(all._results) === length(futures)) {
      all.resolve(futures.constructor(...all._results));
    }
  });
  return all;
};

// these don't work
// Future.allSettled = (futures) => {
//   let results = [];
//   let all = new Futur();
//   for (let future of futures) {
//     future.listen({
//       onCancelled: () => future.cancel(),
//       onRejected: (reason) => results.push(reason),
//       onResolved: (value) => results.push(value),
//     });
//   }
//   return all.listen({
//     onCancelled: () => all.cancel(),
//     onRejected: (reason) => all.reject(reason),
//     onResolved: () => all.resolve(futures.constructor(...results)),
//   });
// };

// Future.any = (futures) => {
//   let errors = [];
//   let any = new Futur();
//   for (let future of futures) {
//     future.listen({
//       onCancelled: () => future.cancel(),
//       onRejected: (reason) => errors.push(reason),
//       onResolved: (value) => {
//         if (any.state === "Pending") {
//           return any.resolve(value);
//         }
//       },
//     });
//   }
//   return any.listen({
//     onCancelled: () => any.cancel(),
//     onRejected: () => any.reject(futures.constructor(...errors)),
//     onResolved: (value) => any.resolve(value),
//   });
// };

// Future.race = (futures) => {
//   let race = new Futur();
//   for (let future of futures) {
//     future.listen({
//       onCancelled: () => future.cancel(),
//       onRejected: (reason) => {
//         if (race.state === "Pending") {
//           return race.reject(reason);
//         }
//       },
//       onResolved: (value) => {
//         if (race.state === "Pending") {
//           return race.resolve(value);
//         }
//       },
//     });
//     return race.listen({
//       onCancelled: () => race.cancel(),
//       onRejected: (reason) => race.cancel(reason),
//       onResolved: (value) => race.resolve(value),
//     });
//   }
// };

export const future = Future;

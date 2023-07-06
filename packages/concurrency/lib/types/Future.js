import { noop } from "@jasonsbarr/functional-core/lib/helpers/noop.js";
import { length } from "@jasonsbarr/functional-core/lib/array/length.js";
import { defer } from "@jasonsbarr/functional-core/lib/lambda/defer.js";
import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { Cancelled } from "../internal/_executionStates.js";
import { Deferred } from "../internal/_deferred.js";
import { AggregateError } from "../internal/_AggregateError.js";

export class Future extends Deferred {
  constructor() {
    super();
    Object.defineProperty(this, "type", {
      configurable: false,
      enumerable: true,
      writable: false,
      value: "Future",
    });
  }

  static new(onRejected, onResolved, onCancelled = noop) {
    return new Future().listen({ onResolved, onRejected, onCancelled });
  }

  // f should return a Future
  chain(f) {
    const result = future();
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

  chainRejected(f) {
    const result = future();
    this.listen({
      onCancelled: () => result.cancel(),
      onRejected: (reason) => {
        f(reason).listen({
          onCancelled: () => result.cancel(),
          onRejected: (reason2) => result.reject(reason2),
          onResolved: (value) => result.resolve(value),
        });
      },
      onResolved: (value) => result.resolve(value),
    });
    return result;
  }

  map(f) {
    const result = future();
    this.listen({
      onCancelled: () => result.cancel(),
      onRejected: (reason) => result.reject(reason),
      onResolved: (value) => result.resolve(f(value)),
    });
    return result;
  }

  mapRejected(f) {
    const reject = future();
    this.listen({
      onCancelled: () => reject.cancel(),
      onRejected: (reason) => reject.reject(f(reason)),
      onResolved: (value) => reject.resolve(value),
    });
    return reject;
  }

  bimap(rejectF, resolveF) {
    const mapped = future();
    this.listen({
      onCancelled: () => mapped.cancel(),
      onRejected: (reason) => mapped.reject(rejectF(reason)),
      onResolved: (value) => mapped.resolve(resolveF(value)),
    });
    return mapped;
  }

  bichain(rejectF, resolveF) {
    const result = future();
    this.listen({
      onCancelled: () => result.cancel(),
      onRejected: (reason) => {
        rejectF(reason).listen({
          onCancelled: () => result.cancel(),
          onRejected: (reason2) => result.reject(reason2),
          onResolved: (value) => result.resolve(value),
        });
      },
      onResolved: (value) => {
        resolveF(value).listen({
          onCancelled: () => result.cancel(),
          onRejected: (reason) => result.reject(reason),
          onResolved: (value2) => result.resolve(value2),
        });
      },
    });
    return result;
  }

  // Maps a resolved value to a rejected Future and vice-versa
  swap(rejToRes, resToRej) {
    let result = future();
    this.listen({
      onCancelled: () => result.cancel(),
      onRejected: (reason) => result.resolve(rejToRes(reason)),
      onResolved: (value) => result.reject(resToRej(value)),
    });
    return result;
  }

  fork(onRejected, onResolved, onCancelled = noop) {
    return this.listen({ onCancelled, onRejected, onResolved });
  }

  ap(future) {
    return this.chain((f) => future.map(f));
  }

  apRejected(future) {
    return this.chain((f) => future.mapRejected(f));
  }

  finalize(pred, value, reason = null) {
    return pred(value) ? this.resolve(value) : this.reject(reason ?? value);
  }

  // Takes a Future-returning function. Chained alts will return the
  // first Resolved Future or the _last_ Rejected/Cancelled Future.
  alt(future) {
    const f = future();
    this.listen({
      onCancelled: () => f.cancel(),
      onRejected: () =>
        future.listen({
          onCancelled: () => f.cancel(),
          onRejected: (reason2) => f.reject(reason2),
          onResolved: (value) => f.resolve(value),
        }),
      onResolved: (value) => f.resolve(value),
    });
    return f;
  }

  // Function order is changed for parity with Promise interface
  then(resolveF, rejectF = noop) {
    return this.fork(rejectF, resolveF);
  }

  catch(rejectF) {
    return this.fork(rejectF, noop);
  }

  finally(fn) {
    return this.fork(fn, fn, fn);
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
    return this.state.name === "Pending";
  }

  isCancelled() {
    return this.state.name === "Cancelled";
  }

  isRejected() {
    return this.state.name === "Rejected";
  }

  isResolved() {
    return this.state.name === "Resolved";
  }

  get [Symbol.toStringTag]() {
    return "Future";
  }
}

Future.isFuture = (obj) => obj?.type === "Future";

Future.of = (value) => {
  return future().resolve(value);
};

Future.rejected = (reason) => {
  return future().reject(reason);
};

Future.fromPromise = (promise) => {
  let f = future();
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
    let f = Future();
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
  const all = future();
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
  const all = future();
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
  const any = future();
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
  let race = future();
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

Future.resolveAfter = curry((ms, value) => {
  const f = future();
  setTimeout(() => f.resolve(value), ms);
  return f;
});

Future.rejectAfter = curry((ms, reason) => {
  const f = future();
  setTimeout(() => f.reject(reason), ms);
  return f;
});

export const future = () => new Future();

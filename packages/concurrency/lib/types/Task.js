import { defer, equals, length, noop } from "@jasonsbarr/functional-core";
import { reduce } from "@jasonsbarr/iterable";
import { Deferred } from "../internal/_deferred.js";
import { TaskExecution } from "./TaskExecution.js";
/**
 * @callback Reject
 * @param {any} reason
 * @returns {TaskClass}
 */
/**
 * @callback Resolve
 * @param {any} value
 * @returns {TaskClass}
 */
/**
 * @callback Cancel
 * @returns {TaskClass}
 */
/**
 * @callback Cleanup
 * @returns {void}
 */
/**
 * @callback Computation
 * @param {Reject} reject
 * @param {Resolve} resolve
 * @param {Cancel} cancel
 * @returns {void}
 */

export class Task {
  /**
   * Task constructor
   * @param {Computation} computation
   * @param {Cleanup} cleanup
   */
  constructor(computation, cleanup = noop) {
    this._computation = computation;
    this._cleanup = cleanup;
    this._isCancelled = false;
  }

  /**
   * Task static constructor
   * @param {Computation} computation
   * @param {Cleanup} cleanup
   * @returns {Task}
   */
  static create(computation, cleanup = noop) {
    return new Task(computation, cleanup);
  }

  /**
   * Enables sequential use of Tasks in an async/await like style using generators and yield
   */
  static do(generator) {
    const nextGeneratorValue = (generator) => (value) => {
      const { value: task, done } = generator.next(value);
      return !done ? task.chain(nextGeneratorValue(generator)) : task;
    };

    return task((_rej, resolve, _can) => resolve(generator())).chain((gen) =>
      nextGeneratorValue(gen)()
    );
  }

  /**
   * Creates an empty task that will never resolve (monoid)
   */
  static empty() {
    return task(() => {});
  }

  /**
   * Converts a Node.js-style continuation callback into a Task
   */
  static fromCallback(fn) {
    return (...args) =>
      task((reject, resolve, _) => {
        fn(...args, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
  }

  /**
   * Converts a Promise-producing function to a Task-producing one
   */
  static fromPromise(promiseFn) {
    return (...args) =>
      task((reject, resolve, _) => {
        promiseFn(...args).then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason);
          }
        );
      });
  }

  /**
   * Lifts a value into a resolved Task (monad)
   */
  static of(value) {
    return task((_rej, resolve, _can) => {
      resolve(value);
    });
  }

  /**
   * Lifts a value into a rejected Task
   */
  static rejected(reason) {
    return task((reject, _res, _can) => {
      reject(reason);
    });
  }

  /**
   * Waits on all Tasks to finish then returns an array of results
   */
  static waitAll(tasks) {
    return reduce(
      (a, b) => a.and(b).map(([xs, x]) => [...xs, x]),
      Task.of([]),
      tasks
    );
  }

  /**
   * Returns the first Task of an array of Tasks that resolves
   */
  static waitAny(tasks) {
    if (equals(length(tasks), 0)) {
      throw new Error("Task.waitAny requires a non-empty array of Tasks");
    }

    return reduce((a, b) => a.or(b), Task.empty(), tasks);
  }

  /**
   * Combines 2 Tasks concurrently
   */
  and(that) {
    return task((reject, resolve, cancel) => {
      const thisExecution = this.run();
      const thatExecution = that.run();
      let valueLeft = null;
      let valueRight = null;
      let doneLeft = false;
      let doneRight = false;
      let cancelled = false;

      const guardResolve = (setter) => (value) => {
        if (cancelled) {
          return;
        }

        setter(value);

        if (doneLeft && doneRight) {
          resolve([valueLeft, valueRight]);
        }
      };

      const guardReject = (fn, execution) => (value) => {
        if (cancelled) {
          return;
        }

        cancelled = true;
        execution.cancel();
        fn(value);
      };

      thisExecution.listen({
        onRejected: guardReject(reject, thatExecution),
        onCancelled: guardReject(cancel, thatExecution),
        onResolved: guardResolve((x) => {
          valueRight = x;
          doneRight = true;
        }),
      });

      thatExecution.listen({
        onRejected: guardReject(reject, thisExecution),
        onCancelled: guardReject(cancel, thisExecution),
        onResolved: guardResolve((x) => {
          valueLeft = x;
          doneLeft = true;
        }),
      });

      if (this._isCancelled) {
        thisExecution.cancel();
        thatExecution.cancel();
      }
    }, this._cleanup);
  }

  /**
   * Applies a Task-wrapped function to the value in another Task (applicative)
   */
  ap(task) {
    return this.chain((f) => task.map(f));
  }

  /**
   * Applies one function to a resolved Task and another to a rejected Task (bifunctor)
   */
  bimap(rejectF, resolveF) {
    return task((reject, resolve, cancel) => {
      const execution = this.run();

      execution.listen({
        onCancelled: cancel,
        onRejected: (reason) => reject(rejectF(reason)),
        onResolved: (value) => resolve(resolveF(value)),
      });

      if (this._isCancelled) {
        execution.cancel();
      }
    }, this._cleanup);
  }

  /**
   * Chains one Task to another, combining them sequentially (monad)
   *
   * f should return a Task
   */
  chain(f) {
    return task((reject, resolve, cancel) => {
      const execution = this.run();

      execution.listen({
        onCancelled: cancel,
        onRejected: reject,
        onResolved: (value) => {
          execution.link(
            f(value).run().listen({
              onCancelled: cancel,
              onRejected: reject,
              onResolved: resolve,
            })
          );
        },
      });

      if (this._isCancelled) {
        execution.cancel();
      }
    }, this._cleanup);
  }

  /**
   * Concatenates 2 Tasks together by selecting the first task to finish (semigroup)
   */
  concat(that) {
    const thisExecution = this.run();
    const thatExecution = that.run();
    const thisCleanup = this._cleanup;
    const thatCleanup = that._cleanup;
    const cleanupBoth = () => {
      thisCleanup();
      thatCleanup();
    };
    let done = false;
    const guard = (f) => (x) => {
      if (!done) {
        done = true;
        defer(cleanupBoth());
        return f(x);
      }
    };

    return task((reject, resolve, cancel) => {
      thisExecution.listen({
        onCancelled: cancel,
        onRejected: guard(reject),
        onResolved: guard(resolve),
      });

      thatExecution.listen({
        onCancelled: cancel,
        onRejected: guard(reject),
        onResolved: guard(resolve),
      });

      if (this._isCancelled) {
        thisExecution.cancel();
      }

      if (that._isCancelled) {
        thatExecution.cancel();
      }
    }, cleanupBoth);
  }

  /**
   * Maps a Task to a new Task (functor)
   */
  map(f) {
    return task((reject, resolve, cancel) => {
      const execution = this.run();

      execution.listen({
        onCancelled: cancel,
        onRejected: reject,
        onResolved: (value) => resolve(f(value)),
      });

      if (this._isCancelled) {
        execution.cancel();
      }
    }, this._cleanup);
  }

  /**
   * Maps the value of a rejected Task
   */
  mapRejected(f) {
    return task((reject, resolve, cancel) => {
      const execution = this.run();

      execution.listen({
        onCancelled: cancel,
        onRejected: (reason) => reject(f(reason)),
        onResolved: resolve,
      });

      if (this._isCancelled) {
        execution.cancel();
      }
    }, this._cleanup);
  }

  /**
   * Combines 2 Tasks and assimilates the result of the first to resolve
   */
  or(that) {
    return task((reject, resolve, cancel) => {
      const thisExecution = this.run();
      const thatExecution = that.run();
      let done = false;

      const guard = (fn, execution) => (value) => {
        if (!done) {
          done = true;
          execution.cancel();
          fn(value);
        }
      };

      thisExecution.listen({
        onRejected: guard(reject, thatExecution),
        onCancelled: guard(cancel, thatExecution),
        onResolved: guard(resolve, thatExecution),
      });

      thatExecution.listen({
        onRejected: guard(reject, thisExecution),
        onCancelled: guard(cancel, thisExecution),
        onResolved: guard(resolve, thisExecution),
      });

      if (this._isCancelled) {
        thisExecution.cancel();
        thatExecution.cancel();
      }
    }, this._cleanup);
  }

  /**
   * Recover from possible failed Tasks
   */
  orElse(handler) {
    return task((reject, resolve, cancel) => {
      const execution = this.run();

      execution.listen({
        onCancelled: cancel,
        onResolved: resolve,
        onRejected: (reason) => {
          execution.link(
            handler(reason).run().listen({
              onCancelled: cancel,
              onRejected: reject,
              onResolved: resolve,
            })
          );
        },
      });

      if (this._isCancelled) {
        execution.cancel();
      }
    }, this._cleanup);
  }

  /**
   * Maps a rejected Task to a resolved one and vice versa (swap)
   */
  swap(rejToResF, resToRejF) {
    return task((reject, resolve, cancel) => {
      const execution = this.run();

      execution.listen({
        onCancelled: cancel,
        onRejected: (reason) => resolve(rejToResF(reason)),
        onResolved: (value) => reject(resToRejF(value)),
      });

      if (this._isCancelled) {
        execution.cancel();
      }
    }, this._cleanup);
  }

  /**
   * Runs a Task's computation
   * @returns {TaskExecution}
   */
  run() {
    let deferred = new Deferred();
    let cleanups = [];
    let computation = this._computation;
    let cleanup = this._cleanup;

    deferred.listen({
      onCancelled: () => {
        this._isCancelled = true;
        cleanups.forEach((f) => f());
        cleanups = [];
      },

      onResolved: (_value) => {
        cleanups.forEach((f) => f());
        cleanups = [];
      },

      onRejected: (_reason) => {
        cleanups.forEach((f) => f());
        cleanups = [];
      },
    });

    const execution = new TaskExecution(this, deferred);

    computation(
      (reason) => deferred.reject(reason),
      (value) => deferred.resolve(value),
      () => deferred.maybeCancel()
    );
    cleanups.push(cleanup);

    return execution;
  }

  get [Symbol.toStringTag]() {
    return "Task";
  }
}

/**
 * Functional Task constructor
 *
 * Usage: task((reject, resolve, cancel) => {
 *    [function body]
 * }, () => {})
 * @param {Computation} computation
 * @param {Cleanup} cleanup
 * @returns {Task}
 */
export const task = (computation, cleanup = noop) =>
  Task.create(computation, cleanup);

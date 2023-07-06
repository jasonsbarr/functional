import { noop } from "@jasonsbarr/functional-core";
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

// Stability: experimental DO NOT USE
export class Task {
  /**
   * Task constructor
   * @param {Computation} computation
   * @param {Cleanup} [cleanup=() => {}]
   */
  constructor(computation, cleanup = noop) {
    this._computation = computation;
    this._cleanup = cleanup;
    this._isCancelled = false;
  }

  /**
   * Lifts a value into a resolved Task
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
 * @returns {TaskClass}
 */
export const task = (computation, cleanup = noop) =>
  new Task(computation, cleanup);

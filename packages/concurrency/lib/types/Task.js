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
   * Maps a Task to a new Task (functor)
   */
  map(f) {
    const task_ = task((reject, resolve, cancel) => {
      const execution = this.run();

      execution.listen({
        onCancelled: () => cancel(),
        onRejected: (reason) => reject(reason),
        onResolved: (value) => resolve(f(value)),
      });
    }, this._cleanup);

    if (this._isCancelled) {
      execution.cancel();
    }

    return task_;
  }

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
}

/**
 * Functional Task constructor
 * @param {Computation} computation
 * @param {Cleanup} cleanup
 * @returns {TaskClass}
 */
export const task = (computation, cleanup) =>
  new TaskClass(computation, cleanup);

import { Deferred } from "../internal/_deferred.js";
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

export class TaskClass {
  /**
   * Task constructor
   * @param {Computation} computation
   * @param {Cleanup} cleanup
   */
  constructor(computation, cleanup) {
    this._computation = computation;
    this._cleanup = cleanup;
    this._deferred = new Deferred();
  }
}

/**
 * Functional Task constructor
 * @param {Computation} computation
 * @param {Cleanup} cleanup
 * @returns {TaskClass}
 */
export const Task = (computation, cleanup) =>
  new TaskClass(computation, cleanup);

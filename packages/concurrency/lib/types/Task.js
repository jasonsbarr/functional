/**
 * @typedef Resolver
 * @prop {Function} resolve
 * @prop {Function} reject
 * @prop {Function} cancel
 * @prop {Function} cleanup
 * @prop {Function} onCancelled
 * @prop {boolean} isCancelled
 */
/**
 * @callback Computation
 * @prop {Resolver} resolver
 * @returns {undefined}
 */

export class Task {
  /**
   * Task constructor
   * @param {Computation} computation
   */
  constructor(computation) {
    this._computation = computation;
  }
}

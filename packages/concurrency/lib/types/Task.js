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
 * @param {Resolver} resolver
 * @returns {void}
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

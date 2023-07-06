import { Future, future } from "./Future.js";

export class TaskExecution {
  /**
   * TaskExecution constructor
   * @param {*} task
   * @param {import("../internal/_deferred.js").Deferred} deferred
   */
  constructor(task, deferred) {
    this._task = task;
    this._deferred = deferred;
    /** @type {TaskExecution[]} */
    this._links = [];
  }

  /**
   * Cancel a task execution
   * @returns {TaskExecution}
   */
  cancel() {
    this._deferred.maybeCancel();
    this._links.forEach((link) => link.cancel());
    return this;
  }

  listen(pattern) {
    this._deferred.listen(pattern);
  }

  /**
   * Convert the current TaskExecution into a Promise
   * @returns {Promise}
   */
  promise() {
    return this._deferred.promise();
  }

  /**
   * Convert the current TaskExecution into a Future
   * @returns {Future}
   */
  future() {
    const state = this._deferred.state;
    const f = future().listen({
      onCancelled: () => this._deferred.cancel(),
      onRejected: (reason) => this._deferred.reject(reason),
      onResolved: (value) => this._deferred.resolve(value),
    });

    if (state.name !== "Pending" && state.name !== "Cancelled") {
      return f.finalize(
        () => state.name === "Resolved",
        state.value,
        state.reason
      );
    } else {
      return f;
    }
  }

  /**
   * Link another execution to the current one
   * @param {TaskExecution} execution
   * @returns {TaskExecution}
   */
  link(execution) {
    this._links.push(execution);
    return this;
  }
}

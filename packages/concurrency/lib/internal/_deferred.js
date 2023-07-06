import { define } from "@jasonsbarr/functional-core/lib/object/define.js";
import { noop } from "@jasonsbarr/functional-core/lib/helpers/noop.js";
import { Pending, Cancelled, Rejected, Resolved } from "./_executionStates.js";

// Match execution state to resolver function
const matchWith = (pattern, state) => {
  if (state.name in pattern) {
    // this works because Cancelled doesn't take an argument, so it's fine if state.reason is undefined
    return pattern[state.name]("value" in state ? state.value : state.reason);
  }
  throw new Error(`${state.name} not found in pattern`);
};

const moveToState = (deferred, newState) => {
  deferred._state = newState;
  const listeners = deferred.listeners;
  for (let listener of listeners) {
    matchWith(
      {
        Cancelled: () => listener.onCancelled(),
        Rejected: (reason) => listener.onRejected(reason),
        Resolved: (value) => listener.onResolved(value),
      },
      deferred.state
    );
  }
};

export class Deferred {
  _state = null;
  _listeners = [];

  constructor() {
    if (this.constructor.name === "Deferred") {
      throw new Error("Abstract class Deferred must be inherited");
    }
    define(this, "_state", Pending());
    define(this, "_listeners", []);
  }

  get state() {
    return this._state;
  }

  set state(state) {
    this._state = state;
  }

  get listeners() {
    return this._listeners;
  }

  set listeners(arr) {
    this._listeners = arr;
  }

  resolve(value) {
    moveToState(this, Resolved(value));
    return this;
  }

  reject(reason) {
    moveToState(this, Rejected(reason));
    return this;
  }

  cancel() {
    moveToState(this, Cancelled());
    return this;
  }

  maybeCancel() {
    if (this._state.name === "Pending") {
      moveToState(this, Cancelled());
    }
    return this;
  }

  listen(pattern) {
    matchWith(
      {
        Pending: () => this.listeners.push(pattern),
        Cancelled: () => pattern.onCancelled() ?? noop,
        Rejected: (reason) => pattern.onRejected(reason),
        Resolved: (value) => pattern.onResolved(value),
      },
      this.state
    );
    return this;
  }

  promise() {
    return new Promise((resolve, reject) => {
      this.listen({
        onCancelled: () => reject(Cancelled()),
        onResolved: resolve,
        onRejected: reject,
      });
    });
  }

  toString() {
    const listeners = this._listeners.length;
    const state = this._state?.name;

    return `Deferred(${state}, ${listeners} listeners)`;
  }

  get [Symbol.toStringTag]() {
    return "Deferred";
  }

  [Symbol.for("nodejs.util.inspect.custom")](depth, options, inspect) {
    return this.toString();
  }
}

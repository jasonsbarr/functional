import { _isPlaceholder } from "./_isPlaceholder.js";
// curry functions and their dependencies stolen from Ramda
export const _curry1 = (fn) => {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
};

// stolen from https://github.com/origamitower/folktale/blob/master/packages/base/source/helpers/defer.js
export const defer =
  typeof setImmediate !== "undefined"
    ? (f) => setImmediate(f)
    : typeof process !== "undefined"
    ? (f) => process.nextTick(f)
    : (f) => setTimeout(f, 0);

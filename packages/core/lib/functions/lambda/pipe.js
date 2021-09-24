import { pipeline } from "./pipeline.js";

// stolen from https://github.com/adobe/ferrum/blob/6434098c7f8ca6cb31a6bbe54dff3d1026a25f2d/src/functional.js#L129
export const pipe =
  (...fns) =>
  (val) =>
    pipeline(val, ...fns);

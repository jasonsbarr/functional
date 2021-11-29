import { failure } from "./failure.js";

export const length = (obj) =>
  obj.size
    ? obj.size
    : obj.length
    ? obj.length
    : failure("Value must have a length or size property");

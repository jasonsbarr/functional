import { failure } from "./failure.js";

export const length = (obj) =>
  obj.length
    ? obj.length
    : obj.size
    ? obj.size
    : failure("Value must have a length or size property");

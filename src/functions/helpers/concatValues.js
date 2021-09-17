import { isNil } from "../type/isNil.js";

export const concatValues = (value1, value2) => {
  if (
    typeof value1 === "string" ||
    typeof value1 === "number" ||
    typeof value1 === "bigint"
  ) {
    return value1 + value2;
  } else if (typeof value1 === "boolean") {
    return value1 && value2;
  } else if (isNil(value1)) {
    return value2;
  } else if (typeof value1 === "symbol") {
    return Symbol(value1.description + value2.description);
  }
  // add cases for Maps, Sets, and functions?
  return value1.concat(value2);
};

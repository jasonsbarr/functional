import { keys } from "../object/keys.js";
import { isNil } from "./isNil.js";

export const concatValues = (value1, value2) => {
  if (
    typeof value1 === "string" ||
    typeof value1 === "number" ||
    typeof value1 === "bigint"
  ) {
    value1 = value1 + value2;
  } else if (typeof value1 === "boolean") {
    value1 = value1 && value2;
  } else if (isNil(value1)) {
    value1 = value2;
  } else if (typeof value1 === "symbol") {
    value1 = Symbol(value1.description + value2.description);
  }
  // add cases for Maps and Sets?
  return value1.concat(value2);
};

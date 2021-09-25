import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";
import { reject } from "./reject.js";
import { equals } from "@jasonsbarr/functional-core/functions/object/equals.js";

export const removeByValue = curry((value, dict) =>
  reject((v, _) => equals(v, value), dict)
);

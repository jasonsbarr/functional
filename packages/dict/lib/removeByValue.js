import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { reject } from "./reject.js";
import { equals } from "@jasonsbarr/functional-core/lib/object/equals.js";

export const removeByValue = curry((value, dict) =>
  reject((v, _) => equals(v, value), dict)
);

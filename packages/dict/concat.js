import { isNil } from "@jasonsbarr/functional-core/functions/predicates/isNil.js";
import { keys } from "@jasonsbarr/functional-core/functions/object/keys.js";
import { copy } from "./copy.js";
import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";
import { symbols } from "@jasonsbarr/functional-core/functions/object/symbols.js";

// Note that dict1 and dict2 should have the same keys and be filled
// completely with Semigroups (types that can be concatenated).
// Safest when both dicts are of type Dict<string, V> where V
// is a concattable type. Uses shallow copy.
export const concat = curry((dict1, dict2) => {
  let c = copy(dict1);
  for (let key of [...keys(dict2), ...symbols(dict2)]) {
    if (
      typeof c[key] === "string" ||
      typeof c[key] === "number" ||
      typeof c[key] === "bigint"
    ) {
      c[key] = c[key] + dict2[key];
    } else if (typeof c[key] === "boolean") {
      c[key] = c[key] && dict2[key];
    } else if (isNil(c[key])) {
      c[key] = dict2[key];
    } else if (isNil(dict2[key])) {
      c[key] = dict2[key];
    } else if (typeof c[key] === "symbol") {
      c[key] = Symbol(c[key].description + dict2[key].description);
    } else {
      c[key].concat(dict2[key]);
    }
  }
  return c;
});

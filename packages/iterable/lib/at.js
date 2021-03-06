import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { Option } from "@jasonsbarr/functional-core/lib/types/Option.js";

// Returns Option, not value
export const at = curry((i, iter) => {
  const temp = [...iter];
  return Option.of(i < 0 ? temp[temp.length - i] : temp[i]);
});

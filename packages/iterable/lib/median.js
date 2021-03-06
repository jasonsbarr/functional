import { Option } from "@jasonsbarr/functional-core/lib/types/Option.js";
import { isEven } from "@jasonsbarr/functional-core/lib/predicates/isEven.js";
import { floor } from "@jasonsbarr/functional-core/lib/math/floor.js";
import { length } from "./length.js";
import { sort } from "./sort.js";

// returns Option
export const median = (iter) => {
  let temp = [...iter];
  const mid = floor(temp.length / 2);
  temp = sort(temp);
  return Option.of(
    isEven(length(temp)) ? (temp[mid - 1] + temp[mid]) / 2 : temp[mid]
  );
};

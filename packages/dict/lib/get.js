import { Option } from "@jasonsbarr/functional-core/lib/types/Option.js";
import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";

// returns Option
export const get = curry((key, dict) => Option.of(dict[key]));

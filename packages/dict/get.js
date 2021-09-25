import { Option } from "@jasonsbarr/functional-core/types/Option.js";
import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";

// returns Option
export const get = curry((key, dict) => Option.of(dict[key]));

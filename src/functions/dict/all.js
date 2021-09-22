import { curry } from "../lambda/curry.js";
import { all as allI } from "../iterable/all.js";
import { values } from "../object/values.js";

export const all = curry((search, dict) => allI(search, values(dict)));

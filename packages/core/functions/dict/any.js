import { curry } from "../lambda/curry.js";
import { any as anyI } from "../iterable/any.js";
import { values } from "../object/values.js";

export const any = curry((search, dict) => anyI(search, values(dict)));

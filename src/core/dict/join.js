import { curry } from "../lambda/curry.js";
import { values } from "../object/values.js";

export const join = curry((sep, dict) => values(dict).join(sep));

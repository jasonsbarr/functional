import { curry } from "../lambda/curry.js";
import { Option } from "../types/Option.js";

export const match = curry((regex, str) => Option.of(str.match(regex)));

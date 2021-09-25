import { Option } from "../types/Option.js";
import { curry } from "../lambda/curry.js";

export const exec = curry((regexp, str) => Option.of(regexp.exec(str)));

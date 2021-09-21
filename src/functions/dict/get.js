import { Option } from "../../types/Option.js";
import { curry } from "../lambda/curry.js";

// returns Option
export const get = curry((key, dict) => Option.of(dict[key]));

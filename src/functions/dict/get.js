import { Option } from "../../types/Option.js";
import { curry } from "../lambda/curry.js";

export const get = curry((key, hash) => Option.of(hash[key]));

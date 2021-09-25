import { Option } from "../../types/Option.js";
import { curry } from "../lambda/curry.js";

export const prop = curry((prop, obj) => Option.of(obj[prop]));

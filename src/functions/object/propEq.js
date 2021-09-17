import { curry } from "../lambda/curry.js";
import { equals } from "./equals.js";

export const propEq = curry((key, value, obj) => equals(obj[key], value));

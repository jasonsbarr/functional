import { curry } from "../lambda/curry.js";
import { substring } from "./substring.js";

export const strTo = curry((end, str) => substring(0, end, str));

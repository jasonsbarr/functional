import { curry } from "../lambda/curry.js";
import { indexOf } from "./indexOf.js";

export const indexOfFromStart = curry((search, str) => indexOf(search, 0, str));

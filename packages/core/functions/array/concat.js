import { curry } from "../lambda/curry.js";

export const concat = curry((second, first) => first.concat(second));

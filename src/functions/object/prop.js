import { curry } from "../lambda/curry.js";

export const prop = curry((prop, obj) => obj[prop]);

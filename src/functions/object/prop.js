import { curry } from "../lambda/curry.js";

// unsafe - may return undefined
export const prop = curry((prop, obj) => obj[prop]);

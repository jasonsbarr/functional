import { curry } from "../lambda/curry.js";

export const hasOwn = curry((prop, obj) => obj.hasOwnProperty(prop));

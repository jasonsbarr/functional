import { curry } from "../lambda/curry.js";

export const liftA2 = curry((f, a, b) => b.ap(a.map(f)));

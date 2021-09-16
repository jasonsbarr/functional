import { curry } from "../lambda/curry.js";

export const liftA4 = curry((f, a, b, c, d) => d.ap(c.ap(b.ap(a.map(f)))));

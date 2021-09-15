import { curry } from "../lambda/function.js";

export const liftA4 = curry((f, a, b, c, d) => d.ap(c.ap(b.ap(a.map(f)))));

import { curry } from "../lambda/curry.js";

export const liftA3 = curry((f, a, b, c) => c.ap(b.ap(a.map(f))));

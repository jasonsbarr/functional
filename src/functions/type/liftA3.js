import { curry } from "../lambda/function.js";

export const liftA3 = curry((f, a, b, c) => c.ap(b.ap(a.map(f))));

import { curry } from "./function";

export const liftA2 = curry((f, a, b) => b.ap(a.map(f)));

export const liftA3 = curry((f, a, b, c) => c.ap(b.ap(a.map(f))));

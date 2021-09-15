import { curry } from "../lambda/curry.js";

export const liftA5 = curry((f, a, b, c, d, e) =>
  e.ap(d.ap(c.ap(b.ap(a.map(f)))))
);

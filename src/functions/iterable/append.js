export const append = curry((item, iter) => iter.constructor(...iter, item));

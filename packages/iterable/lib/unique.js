export const unique = (iter) => iter.constructor(...[...new Set([...iter])]);

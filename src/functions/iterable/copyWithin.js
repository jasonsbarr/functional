// have to do data-first due to optional arguments
export const copyWithin = (iter, target, start, end) =>
  iter.constructor(...[...iter].copyWithin(target, start, end));

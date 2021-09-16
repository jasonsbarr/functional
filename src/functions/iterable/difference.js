export const difference = (iter1, iter2) => {
  const set1 = new Set([...iter1]);
  const set2 = new Set([...iter2]);
  for (let item of set2) {
    set1.delete(item);
  }
  return iter1.constructor(...set1);
};

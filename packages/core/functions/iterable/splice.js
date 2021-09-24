export const splice = (iter, start = 0, deleteCount = 0, ...items) => {
  let temp = [...iter];
  temp.splice(start, deleteCount, ...items);
  return iter.constructor(...temp);
};

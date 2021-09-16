export const eachWithIndex = curry((fn, iter) => {
  let i = 0;
  for (let item of iter) {
    fn(item, i);
    i++;
  }
});

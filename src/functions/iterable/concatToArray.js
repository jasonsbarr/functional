export const concatToArray = (...iters) =>
  iters.reduce((arr, iter) => arr.concat([...iter]), []);

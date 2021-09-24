// assumes all items in iterable are of same type, based on first item in iterable
// because why would you want to sort a list of different types? That would be dumb.
// Give either a key or a function, but not both. If you give both, it will use the function.
export const sort = (iter, { key = "", fn = null, reversed = false } = {}) => {
  let temp = [...iter];
  if (fn) {
    temp.sort(fn);
  } else if (typeof temp[0] === "number") {
    temp.sort((a, b) => a - b);
  } else if (typeof temp[0] === "boolean") {
    temp.sort((a, b) => (a === b ? 0 : a ? -1 : 1));
  } else if (typeof temp[0] === "symbol") {
    temp.sort((a, b) =>
      a.description > b.description ? 1 : a.description < b.description ? -1 : 0
    );
  } else if (key) {
    if (typeof temp[0][key] === "number") {
      temp.sort((a, b) => a[key] - b[key]);
    } else if (typeof temp[0][key] === "boolean") {
      temp.sort((a, b) => (a[key] === b[key] ? 0 : a[key] ? -1 : 1));
    } else if (typeof temp[0][key] === "string") {
      temp.sort((a, b) => (a[key] > b[key] ? 1 : a[key] === b[key] ? 0 : -1));
    } else if (typeof temp[0][key] === "symbol") {
      temp.sort((a, b) =>
        a[key].description > b[key].description
          ? 1
          : a[key].description < b[key].description
          ? -1
          : 0
      );
    }
  } else {
    temp.sort();
  }
  return reversed
    ? iter.constructor(...temp.reverse())
    : iter.constructor(...temp);
};

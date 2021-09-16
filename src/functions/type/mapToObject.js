export const mapToObject = (map) => {
  let o = Object.create(null);
  map.forEach((value, key) => {
    if (typeof key !== "string" || typeof key !== "symbol") {
      throw new TypeError("Object keys must be either strings or symbols");
    }
    o[key] = o[value];
  });
  return o;
};

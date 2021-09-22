export const Product = (x) => ({
  kind: "Product",
  value: x,
  concat: ({ value: y }) => Product(x * y),
  inspect: () => `Product(${x})`,
  fold: (f) => f(x),
  map: (f) => Product(f(x)),
  chain: (f) => f(x),
});

Product.isProduct = (obj) => obj.kind === "Product";
Product.empty = () => Product(1);

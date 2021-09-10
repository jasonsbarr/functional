export const Product = (x) => ({
  kind: "Product",
  value: x,
  concat: ({ value: y }) => Product(x * y),
  inspect: () => `Product(${x})`,
});

Product.isProduct = (obj) => obj.kind === "Product";
Product.empty = () => Product(1);

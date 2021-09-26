import { Id } from "@jasonsbarr/functional-core/lib/types/Id.js";

export const productToId = (product) => Id(product.valueOf());

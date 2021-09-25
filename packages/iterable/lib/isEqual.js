import { curry } from "@jasonsbarr/functional-core/lambda/curry.js";
import { equals } from "@jasonsbarr/functional-core/object/equals.js";

export const isEqual = curry((iter1, iter2) => equals(iter1, iter2));

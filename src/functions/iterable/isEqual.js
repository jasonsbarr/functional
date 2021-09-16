import { curry } from "../lambda/curry.js";
import { equals } from "../object/equals.js";

export const isEqual = curry((iter1, iter2) => equals(iter1, iter2));

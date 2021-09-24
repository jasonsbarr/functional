import { curry } from "../lambda/curry.js";
import { equals } from "../object/equals.js";

export const eq = curry((v1, v2) => equals(v1, v2));

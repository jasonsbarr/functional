import { curry } from "../lambda/curry.js";

export const gte = curry((v1, v2) => v1 >= v2);

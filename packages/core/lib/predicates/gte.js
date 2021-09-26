import { curry } from "../lambda/curry.js";

export const gte = curry((v2, v1) => v1 >= v2);

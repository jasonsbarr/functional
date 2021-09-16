import { curry } from "../lambda/curry";

export const has = curry((key, hash) => key in hash);

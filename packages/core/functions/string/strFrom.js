import { curry } from "../lambda/curry.js";
import { strLen } from "./strLen.js";
import { substring } from "./substring.js";

export const strFrom = curry((start, str) =>
  substring(start, strLen(str), str)
);

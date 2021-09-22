import { curry } from "../lambda/curry.js";
import { reject } from "./reject.js";

export const removeByKey = curry((key, dict) =>
  reject((_, k) => k === key, dict)
);

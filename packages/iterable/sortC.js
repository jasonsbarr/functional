import { curry } from "../lambda/curry.js";
import { sort } from "./sort.js";

// curried sort - MUST pass options, even if it's an empty object
// options: {key: "", fn: () => {}, reverse: false}
export const sortC = curry((options, iter) => sort(iter, options));

import { curry } from "../lambda/curry.js";
import { getTime } from "./getTime.js";
import { date } from "./date.js";

export const setMilliseconds = curry((ms, d) =>
  date(getTime(d)).setMilliseconds(ms)
);

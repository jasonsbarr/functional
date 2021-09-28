import { curry } from "../lambda/curry.js";
import { getTime } from "./getTime.js";
import { date } from "./date.js";

export const setSeconds = curry((seconds, d) =>
  date(getTime(d)).setSeconds(seconds)
);

import { curry } from "../lambda/curry.js";
import { getTime } from "./getTime.js";
import { date } from "./date.js";

export const setTime = curry((timestamp, d) =>
  date(getTime(d)).setTime(timestamp)
);

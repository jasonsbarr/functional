import { curry } from "../lambda/curry.js";
import { getTime } from "./getTime.js";
import { date } from "./date.js";

export const setFullYear = curry((year, d) =>
  date(getTime(d)).setFullYear(year)
);

import { curry } from "../lambda/curry.js";
import { getTime } from "./getTime.js";
import { date } from "./date.js";

export const setUTCMonth = curry((month, d) =>
  date(getTime(d)).setUTCMonth(month)
);

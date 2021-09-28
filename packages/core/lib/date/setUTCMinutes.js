import { curry } from "../lambda/curry.js";
import { getTime } from "./getTime.js";
import { date } from "./date.js";

export const setUTCMinutes = curry((mins, d) =>
  date(getTime(d)).setUTCMinutes(mins)
);

import { curry } from "../lambda/curry.js";
import { date } from "./date.js";
import { getTime } from "./getTime.js";

export const setDate = curry((dayOfMonth, d) =>
  date(getTime(d)).setDate(dayOfMonth)
);

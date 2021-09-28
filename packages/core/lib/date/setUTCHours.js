import { curry } from "../lambda/curry.js";
import { getTime } from "./getTime.js";
import { date } from "./date.js";

export const setUTCHours = curry((hour, d) =>
  date(getTime(d)).setUTCHours(hour)
);

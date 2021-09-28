import { curry } from "../lambda/curry.js";
import { getTime } from "./getTime.js";
import { date } from "./date.js";

export const setUTCSeconds = curry((secs, d) =>
  date(getTime(d)).setUTCSeconds(secs)
);

import { curry } from "../lambda/curry.js";
import { getTime } from "./getTime.js";
import { date } from "./date.js";

export const setUTCDate = curry((day, d) => date(getTime(d)).setUTCDate(day));

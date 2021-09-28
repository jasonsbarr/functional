import { curry } from "../lambda/curry.js";
import { getTime } from "./getTime.js";
import { date } from "./date.js";

export const setMonth = curry((month, d) => date(getTime(d)).setMonth(month));

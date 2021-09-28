import { curry } from "../lambda/curry.js";
import { getTime } from "./getTime.js";
import { date } from "./date.js";

export const setMinutes = curry((mins, d) => date(getTime(d)).setMinutes(mins));

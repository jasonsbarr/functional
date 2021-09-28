import { curry } from "../lambda/curry.js";
import { getTime } from "./getTime.js";
import { date } from "./date.js";

export const setHours = curry((hour, d) => date(getTime(d)).setHours(hour));

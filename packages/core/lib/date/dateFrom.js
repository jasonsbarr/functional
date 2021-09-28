import { curry } from "../lambda/curry.js";
import { date } from "./date.js";

export const dateFrom = curry((dateFn, arg, d) => date(dateFn(arg, d)));

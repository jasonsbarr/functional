import { curry } from "../lambda/curry.js";

export const setDate = curry((dayOfMonth, date) => date.setDate(dayOfMonth));

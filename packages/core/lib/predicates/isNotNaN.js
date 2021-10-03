import { isNotANum } from "./isNotANum.js";
import { not } from "../helpers/not.js";

export const isNotNaN = (num) => not(isNotANum(num));

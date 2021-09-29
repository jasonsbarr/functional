import { isNumber } from "./isNumber.js";
import { isNotANum } from "./isNotANum.js";
import { not } from "../helpers/not.js";

export const isNumNotNan = (value) => isNumber(value) && not(isNotANum(value));

import { isString } from "./isString.js";
import { length } from "../string/length.js";
import { eq } from "./eq.js";
import { and } from "../helpers/and.js";

export const isEmptyStr = (str) => and(isString(str), eq(0, length(str)));

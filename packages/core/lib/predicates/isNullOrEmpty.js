// checks if a string is null/undefined or empty
import { isNil } from "./isNil.js";
import { isEmptyStr } from "./isEmptyStr.js";
import { or } from "../helpers/or.js";

export const isNullOrEmpty = (val) => or(isNil(val), isEmptyStr(val));

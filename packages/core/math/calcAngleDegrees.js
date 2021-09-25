import { curry } from "../lambda/curry.js";
import { atan } from "./atan.js";
import { pi } from "./pi.js";

export const calcAngleDegrees = curry((x, y) => (atan(x, y) * 180) / pi());

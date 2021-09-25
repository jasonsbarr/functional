import { mod } from "../math/mod.js";
import { eq } from "./eq.js";

export const isOdd = (num) => eq(mod(num, 2), 1);

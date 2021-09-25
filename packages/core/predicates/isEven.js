import { mod } from "../math/mod.js";
import { eq } from "./eq.js";

export const isEven = (num) => eq(mod(num, 2), 0);

import { eq } from "./eq.js";
import { negativeInfinity } from "../number/negativeInfinity.js";

export const isNegativeInfinity = (value) => eq(negativeInfinity(), value);

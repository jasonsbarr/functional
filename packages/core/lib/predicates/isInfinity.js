import { eq } from "./eq.js";
import { infinity } from "../number/infinity.js";

export const isInfinity = (value) => eq(infinity(), value);

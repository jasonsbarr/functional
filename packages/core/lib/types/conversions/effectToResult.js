import { Ok } from "../Result.js";

export const effectToResult = (effect) => effect.fold(Ok);

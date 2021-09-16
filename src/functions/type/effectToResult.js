import { Ok } from "../../types/Result.js";

export const effectToResult = (effect) => effect.fold(Ok);

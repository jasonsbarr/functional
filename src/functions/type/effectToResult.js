import { Ok } from "../../types/Result";

export const effectToResult = (effect) => effect.fold(Ok);

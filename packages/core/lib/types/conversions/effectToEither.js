import { Right } from "../Either.js";

export const effectToEither = (effect) => effect.fold(Right);

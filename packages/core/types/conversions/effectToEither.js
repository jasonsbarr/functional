import { Right } from "../Either.js.js";

export const effectToEither = (effect) => effect.fold(Right);

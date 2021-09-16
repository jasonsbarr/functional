import { Right } from "../../types/Either.js";

export const effectToEither = (effect) => effect.fold(Right);

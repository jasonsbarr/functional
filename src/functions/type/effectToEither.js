import { Right } from "../../types/Either";

export const effectToEither = (effect) => effect.fold(Right);

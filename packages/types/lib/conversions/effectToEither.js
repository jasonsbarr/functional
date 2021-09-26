import { Right } from "@jasonsbarr/functional-core/lib/types/Either.js";

export const effectToEither = (effect) => effect.fold(Right);

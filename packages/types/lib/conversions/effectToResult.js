import { Ok } from "@jasonsbarr/functional-core/lib/types/Result.js";

export const effectToResult = (effect) => effect.fold(Ok);

import { Some } from "@jasonsbarr/functional-core/lib/types/Option.js";

export const effectToOption = (effect) => effect.fold(Some);

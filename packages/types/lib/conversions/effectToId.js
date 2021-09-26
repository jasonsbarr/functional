import { Id } from "@jasonsbarr/functional-core/lib/types/Id.js";

export const effectToId = (effect) => effect.fold(Id);

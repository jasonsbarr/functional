import { Future } from "@jasonsbarr/functional-core/lib/types/Future.js";

export const effectToFuture = (effect) => effect.fold(Future.of);

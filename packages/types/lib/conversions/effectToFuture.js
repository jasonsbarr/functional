import { Future } from "@jasonsbarr/concurrency/lib/Future.js";

export const effectToFuture = (effect) => effect.fold(Future.of);

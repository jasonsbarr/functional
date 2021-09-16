import { Future } from "../../types/Future";

export const effectToFuture = (effect) => effect.fold(Future.of);

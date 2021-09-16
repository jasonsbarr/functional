import { Future } from "../../types/Future.js";

export const effectToFuture = (effect) => effect.fold(Future.of);

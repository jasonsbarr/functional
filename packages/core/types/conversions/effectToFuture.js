import { Future } from "../Future.js";

export const effectToFuture = (effect) => effect.fold(Future.of);

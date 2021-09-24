import { Future } from "../../types/Future.js";

export const identityToFuture = (identity) => fold(Future.of);

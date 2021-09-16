import { Future } from "../../types/Future";

export const identityToFuture = (identity) => fold(Future.of);

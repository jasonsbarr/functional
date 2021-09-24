import { Future } from "../Future.js";

export const idToFuture = (identity) => identity.fold(Future.of);

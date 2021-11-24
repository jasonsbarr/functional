import { Future } from "../Future.js";

export const resultToFuture = (result) => result.fold(Future.reject, Future.of);

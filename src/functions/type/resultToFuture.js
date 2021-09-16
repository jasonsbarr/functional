import { Future } from "../../types/Future";

export const resultToFuture = (result) => result.fold(Future.reject, Future.of);

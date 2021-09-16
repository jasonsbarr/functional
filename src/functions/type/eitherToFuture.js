import { Future } from "../../types/Future";

export const eitherToFuture = (either) => either.fold(Future.reject, Future.of);

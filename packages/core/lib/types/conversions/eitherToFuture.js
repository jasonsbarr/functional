import { Future } from "../Future.js";

export const eitherToFuture = (either) => either.fold(Future.reject, Future.of);

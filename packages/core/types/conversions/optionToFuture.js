import { Future } from "../Future.js";

export const optionToFuture = (option) => option.fold(Future.reject, Future.of);

import { Future } from "../../types/Future.js";

export const optionToFuture = (option) => option.fold(Future.reject, Future.of);

import { Future } from "../../types/Future";

export const optionToFuture = (option) => option.fold(Future.reject, Future.of);

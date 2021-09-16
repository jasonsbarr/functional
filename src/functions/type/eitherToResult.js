import { Err, Ok } from "../../types/Result.js";

export const eitherToResult = (either) => either.fold(Err, Ok);

import { Err, Ok } from "../Result.js";

export const eitherToResult = (either) => either.fold(Err, Ok);

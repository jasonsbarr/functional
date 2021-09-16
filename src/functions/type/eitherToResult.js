import { Err, Ok } from "../../types/Result";

export const eitherToResult = (either) => either.fold(Err, Ok);

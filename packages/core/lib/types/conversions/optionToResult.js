import { Err, Ok } from "../Result.js";

export const optionToResult = (option) => option.fold(Err, Ok);

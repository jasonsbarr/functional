import { Err, Ok } from "../../types/Result.js";

export const optionToResult = (option) => option.fold(Err, Ok);

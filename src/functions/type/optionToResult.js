import { Err, Ok } from "../../types/Result";

export const optionToResult = (option) => option.fold(Err, Ok);

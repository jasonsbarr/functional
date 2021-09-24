import { Left, Right } from "../../types/Either.js";

export const optionToEither = (option) => option.fold(Left, Right);

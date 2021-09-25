import { Left, Right } from "../Either.js";

export const optionToEither = (option) => option.fold(Left, Right);

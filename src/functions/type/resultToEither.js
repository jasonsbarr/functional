import { Left, Right } from "../../types/Either.js";

export const resultToEither = (result) => result.fold(Left, Right);

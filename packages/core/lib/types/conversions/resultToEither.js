import { Left, Right } from "../Either.js";

export const resultToEither = (result) => result.fold(Left, Right);

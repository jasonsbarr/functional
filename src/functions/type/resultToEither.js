import { Left, Right } from "../../types/Either";

export const resultToEither = (result) => result.fold(Left, Right);

import { Left, Right } from "../../types/Either";

export const optionToEither = (option) => option.fold(Left, Right);

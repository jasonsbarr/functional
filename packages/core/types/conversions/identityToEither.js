import { Right } from "../../types/Either.js";

export const identityToEither = (identity) => identity.fold(Right);

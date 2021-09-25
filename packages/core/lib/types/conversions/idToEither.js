import { Right } from "../Either.js";

export const idToEither = (identity) => identity.fold(Right);

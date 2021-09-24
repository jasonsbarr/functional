import { Ok } from "../../types/Result.js";

export const identityToResult = (identity) => identity.fold(Ok);

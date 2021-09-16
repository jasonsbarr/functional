import { Ok } from "../../types/Result";

export const identityToResult = (identity) => identity.fold(Ok);

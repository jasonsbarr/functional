import { Ok } from "../Result.js";

export const idToResult = (identity) => identity.fold(Ok);

import { Some } from "../../types/Option.js";

export const identityToOption = (identity) => identity.fold(Some);

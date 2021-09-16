import { Some } from "../../types/Option";

export const identityToOption = (identity) => identity.fold(Some);

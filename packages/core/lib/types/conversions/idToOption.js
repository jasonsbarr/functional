import { Some } from "../Option.js";

export const idToOption = (identity) => identity.fold(Some);

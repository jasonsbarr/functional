import { None, Some } from "../Option.js";

export const resultToOption = (result) => result.fold(None, Some);

import { None, Some } from "../../types/Option.js";

export const resultToOption = (result) => result.fold(None, Some);

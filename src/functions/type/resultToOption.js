import { None, Some } from "../../types/Option";

export const resultToOption = (result) => result.fold(None, Some);

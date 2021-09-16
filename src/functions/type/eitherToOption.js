import { None, Some } from "../../types/Option.js";

export const eitherToOption = (either) => either.fold(None, Some);

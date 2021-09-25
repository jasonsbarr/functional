import { None, Some } from "../Option.js";

export const eitherToOption = (either) => either.fold(None, Some);

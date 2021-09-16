import { None, Some } from "../../types/Option";

export const eitherToOption = (either) => either.fold(None, Some);

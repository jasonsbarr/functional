import { Some } from "../../types/Option.js";

export const effectToOption = (effect) => effect.fold(Some);

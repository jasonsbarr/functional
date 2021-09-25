import { Some } from "../Option.js";

export const effectToOption = (effect) => effect.fold(Some);

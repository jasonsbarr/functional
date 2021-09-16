import { Some } from "../../types/Option";

export const effectToOption = (effect) => effect.fold(Some);

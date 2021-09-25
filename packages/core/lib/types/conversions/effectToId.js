import { Id } from "../Id.js";

export const effectToId = (effect) => effect.fold(Id);

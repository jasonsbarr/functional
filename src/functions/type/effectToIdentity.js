import { Identity } from "../../types/Identity.js";

export const effectToIdentity = (effect) => effect.fold(Identity);

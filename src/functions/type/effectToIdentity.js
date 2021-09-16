import { Identity } from "../../types/Identity";

export const effectToIdentity = (effect) => effect.fold(Identity);

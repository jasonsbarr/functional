import { Identity } from "../../types/Identity.js";

export const resultToIdentity = (result) => result.fold(Identity, Identity);

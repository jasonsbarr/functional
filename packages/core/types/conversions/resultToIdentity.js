import { Identity } from "../Identity.js";

export const resultToIdentity = (result) => result.fold(Identity, Identity);

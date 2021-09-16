import { Identity } from "../../types/Identity.js";

export const eitherToIdentity = (either) => either.fold(Identity, Identity);

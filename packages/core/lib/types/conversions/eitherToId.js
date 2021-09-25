import { Id } from "../Id.js";

export const eitherToId = (either) => either.fold(Id, Id);

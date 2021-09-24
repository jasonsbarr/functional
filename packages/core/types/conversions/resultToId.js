import { Id } from "../Id.js";

export const resultToId = (result) => result.fold(Id, Id);

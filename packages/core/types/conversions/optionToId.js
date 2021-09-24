import { Id } from "../Id.js";

export const optionToId = (option) => option.fold(Id, Id);

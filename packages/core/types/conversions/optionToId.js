import { Id } from "../Id.js";

const optionToId = (option) => option.fold(Id, Id);

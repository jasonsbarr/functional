import { ifElse } from "./ifElse.js";
import { Some, None } from "../../types/Option.js";

export const safe = (pred) => ifElse(pred, Some, None);

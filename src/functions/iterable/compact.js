import { reject } from "./reject.js";
import { isNil } from "../helpers/isNil";

export const compact = (iter) =>
  reject((item) => isNil(item) || Number.isNaN(item), iter);

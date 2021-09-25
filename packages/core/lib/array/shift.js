import { Option } from "../types/Option.js";

export const shift = (arr) => Option.of([...arr].shift());

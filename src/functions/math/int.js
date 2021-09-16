import { Option } from "../../types/Option.js";

export const int = (str) => Option.of(parseInt(str));

import { Option } from "../../types/Option.js";

export const float = (str) => Option.of(parseFloat(str));

import { handleNegativeIndex } from "../helpers/handleNegativeIndex.js";
import { Option } from "../../types/Option.js";
import { curry } from "../lambda/curry.js";

// returns Option
export const at = curry((i, arr) => Option.of(arr[handleNegativeIndex(i)]));

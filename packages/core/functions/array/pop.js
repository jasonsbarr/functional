import { handleNegativeIndex } from "../helpers/handleNegativeIndex.js";
import { Option } from "../../types/Option.js";

// returns Option
export const pop = (arr) => Option.of(arr[handleNegativeIndex(-1)]);

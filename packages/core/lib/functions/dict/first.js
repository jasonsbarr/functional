import { values } from "../object/values.js";
import { at } from "../iterable/at.js";

// returns Option
export const first = (dict) => {
  const vs = values(dict);
  return at(0, vs);
};

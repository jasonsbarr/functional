import { at } from "../iterable/at.js";
import { length } from "../iterable/length.js";
import { values } from "../object/values.js";

export const last = (dict) => {
  const vs = values(dict);
  return at(length(vs) - 1, vs);
};

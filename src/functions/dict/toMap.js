import { keys } from "../object/keys";

export const toMap = (hash) => {
  let m = new Map();
  for (let key of keys(hash)) {
    m.set(key, hash[key]);
  }
  return m;
};

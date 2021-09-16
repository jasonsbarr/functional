import { keys } from "../object/keys.js";

// Makes a shallow copy of a hash object's own string keys to a hash object with null prototype
// If you want prototype properties, a non-null prototype, or non-string keys use object/extend
export const copy = (hash) => {
  let copy = Object.create(null);
  for (let key of keys(hash)) {
    copy[key] = hash[key];
  }
  return copy;
};

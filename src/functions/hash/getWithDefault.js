import { nullish } from "../helpers/nullish";
import { curry } from "../lambda/curry";

export const getWithDefault = curry((key, defaultValue, hash) =>
  nullish(hash[key]) ? defaultValue : hash[key]
);

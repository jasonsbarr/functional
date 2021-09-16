import { Option } from "../../types/Option";
import { curry } from "../lambda/curry";

export const get = curry((key, hash) => Option.of(hash[key]));

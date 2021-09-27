import grapheme_iterator from "./vendor/grapheme_iterator.js";
import { Tuple } from "../../collections/lib/Tuple.js";

export const splitGrapheme = (str) => Tuple.of(grapheme_iterator(str));

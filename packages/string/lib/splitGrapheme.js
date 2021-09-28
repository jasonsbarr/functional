import grapheme_iterator from "./vendor/grapheme_iterator.js";

export const splitGrapheme = (str) => grapheme_iterator(str);

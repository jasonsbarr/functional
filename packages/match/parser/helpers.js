import {
  IDENTIFIER_START,
  IDENTIFIER_CHAR,
  IDENTIFIER_REGEXP,
  OP_CHARS,
  REGEX_REGEX,
  operators,
  punc,
  keywords,
} from "./constants.js";

export const isDigit = (char) => /[0-9_]/.test(char);

export const isHexChar = (char) => /[0-9a-fA-F_]/.test(char);

export const isOctChar = (char) => /[0-7_]/.test(char);

export const isBinChar = (char) => /[01_]/.test(char);

export const isWhitespace = (char) => /\s/.test(char);

export const isIdStart = (char) => IDENTIFIER_START.test(char);

export const isIdChar = (char) => IDENTIFIER_CHAR.test(char);

export const isValidId = (str) => IDENTIFIER_REGEXP.test(str);

export const isOpChar = (char) => OP_CHARS.indexOf(char) > -1;

export const isOperator = (str) => operators.includes(str);

export const isPunc = (char) => punc.includes(char);

export const isKeyword = (str) => keywords.includes(str);

export const matchRegexBody = (str) => REGEX_REGEX.test(str);

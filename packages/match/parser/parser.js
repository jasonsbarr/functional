import { pipeline } from "@jasonsbarr/functional-core/lib/lambda/pipeline.js";
import read from "./lexer.js";

const raw = (str) => String.raw`${str}`;

const parse = (input) => {};

export default (code) => pipeline(code, raw, read, parse);

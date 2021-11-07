import { pipeline } from "@jasonsbarr/functional-core/lib/lambda/pipeline.js";
import read from "./lexer.js";

const raw = (str) => String.raw`${str}`;

const parse = (whichCase) => (input) => {
  let mode = "pattern";
  let context = "statement";
  let pos = 0;

  const peek = () => input[pos];
  const next = () => input[++pos];
  const lookahead = (i) => input[pos + i];
  const skip = () => pos++;
  const eoi = () => input[pos] === undefined;
  const croak = (msg) => {
    throw new SyntaxError(msg);
  };
  const skipIf = (pred, expected) => {
    const tok = peek();
    pred(peek())
      ? skip()
      : croak(
          `Invalid token: expected ${expected}, got ${tok.value} at pos ${tok.pos} in case ${whichCase}`
        );
  };
};

export default (code, whichCase) =>
  pipeline(code, raw, read(whichCase), parse(whichCase));

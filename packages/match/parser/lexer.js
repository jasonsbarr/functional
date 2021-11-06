import {
  isDigit,
  isHexChar,
  isOctChar,
  isBinChar,
  isWhitespace,
  isOpChar,
  isOperator,
  isIdStart,
  isIdChar,
  isValidId,
  isPunc,
  isKeyword,
} from "./helpers.js";

const read = (input, whichCase) => {
  let pos = 0;
  let tokens = [];

  const peek = () => input.charAt(pos);
  const next = () => input.charAt(pos++);
  const skip = () => pos++;
  const eoi = () => peek() == "";
  const croak = (msg) => {
    throw new SyntaxError(`${msg} in case ${whichCase}, pos ${pos}`);
  };
  const makeToken = (type, value) => ({ type, value, pos, case: whichCase });

  const readWhile = (pred) => {
    let str = "";

    while (!eoi() && pred(input)) {
      str += next();
    }

    return str;
  };

  const readNumber = () => {
    let num = readWhile(isDigit);

    if (num.length > 1 && num.charAt(0) === "0") {
      // is octal literal
      return makeToken("number", parseInt(num, 8));
    }

    if (num === "0") {
      if (peek().toLowerCase() === "x") {
        // is hexadecimal integer
        num += readWhile(isHexChar);
        return makeToken("number", parseInt(num, 16));
      }

      if (peek().toLowerCase() === "o") {
        // is octal integer
        num += readWhile(isOctChar);
        return makeToken("number", parseInt(num, 8));
      }

      if (peek().toLowerCase() === "b") {
        // is binary integer
        num += readWhile(isBinChar);
        return makeToken("number", parseInt(num, 2));
      }

      if (peek() !== ".") {
        // is the integer zero
        return makeToken("number", 0);
      }
    }

    if (peek() === "n") {
      // is BigInt
      skip();
      return makeToken("bigint", BigInt(num));
    }

    if (peek() === ".") {
      num += next();
      num += readWhile(isDigit);

      if (/[eE]/.test(peek())) {
        num += next();

        if (/[\+\-]/.test(peek())) {
          num += next();
        }

        num += readWhile(isDigit);
      }

      return makeToken("number", parseFloat(num));
    }
  };

  const readEscapeSequence = (ch) => {
    let str = "";
    let seq = "";
    if (ch == "n") {
      str += "\n";
    } else if (ch == "b") {
      str += "\b";
    } else if (ch == "f") {
      str += "\f";
    } else if (ch == "r") {
      str += "\r";
    } else if (ch == "t") {
      str += "\t";
    } else if (ch == "v") {
      str += "\v";
    } else if (ch == "0") {
      str += "\0";
    } else if (ch == "'") {
      str += "'";
    } else if (ch == '"') {
      str += '"';
    } else if (ch == "\\") {
      str += "\\";
    } else if (ch == "x") {
      // is hexadecimal escape sequence
      seq = readWhile((ch) => isHexadecimalChar(ch));
      str += String.fromCharCode(parseInt(seq, 16));
    } else if (ch == "u") {
      // is Unicode escape sequence
      if (peek() === "{") {
        skip();
      }
      seq = readWhile((ch) => isHexadecimalChar(ch));
      str += String.fromCodePoint(parseInt(seq, 16));
      if (peek() === "}") {
        skip();
      }
    }
    return str;
  };

  const readEscaped = (end) => {
    let escaped = false;
    let str = "";
    skip();

    while (!eoi()) {
      let ch = next();

      if (escaped) {
        str += readEscapeSequence(ch);
        escaped = false;
      } else if (ch == "\\") {
        escaped = true;
      } else if (ch == end) {
        break;
      } else if (ch == "\n") {
        croak(`Unexpected EOL in string literal`);
      } else {
        str += ch;
      }
    }

    return str;
  };

  const readString = (open) => makeToken("string", readEscaped(open));

  const readTemplateString = () => {
    let str = "";
    skip();
    str += readWhile((ch) => ch !== "`");

    // will do this better later, but this works for now
    return makeToken("templateString", eval(str));
  };

  const readOp = () => {
    const op = readWhile(isOpChar);

    if (!isOperator(op)) {
      croak(`Invalid symbol ${op} at ${pos}`);
    }

    return makeToken("operator", op);
  };

  const readIdent = () => {
    let str = next();

    str += readWhile(isIdChar);

    if (isOperator(str)) {
      return makeToken("operator", str);
    }

    if (isKeyword(str)) {
      return makeToken(str, str);
    }

    if (str === "_") {
      return makeToken("catchall", str);
    }

    if (isValidId(str)) {
      return makeToken("ident", str);
    }

    croak(`Invalid symbol ${str}`);
  };

  const readNext = () => {
    readWhile(isWhitespace);

    let ch = peek();

    if (isDigit(ch)) {
      return readNumber();
    }

    if (ch === '"' || ch === "'") {
      return readString(ch);
    }

    if (ch === "`") {
      return readTemplateString();
    }

    if (isOpChar(ch)) {
      return readOp();
    }

    if (isIdStart(ch)) {
      return readIdent();
    }

    if (isPunc(ch)) {
      skip();
      return makeToken("punc", ch);
    }

    croak(`Invalid character ${ch}`);
  };

  while (!eoi()) {
    let token = readNext();

    if (token) {
      tokens.push(token);
    }
  }

  return tokens;
};

export default read;

import parse from "./parser.js";

const split = (code) => {
  const split1 = code.split("->");
  const [pattern, when] = split1[0].split("when");
  const expr = split1[1];

  return {
    pattern: parse(pattern),
    when,
    expr,
  };
};

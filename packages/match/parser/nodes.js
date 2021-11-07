// AST nodes for pattern matching DSL, which includes arbitrary JavaScript expressions
// The whole pattern expression, including optional when clause
export const PatternExpression = (pattern, when, expr) => ({
  type: "PatternExpression",
  pattern,
  when,
  expr,
});

// Literals
export const NumericLiteral = (value) => ({ type: "NumericLiteral", value });
export const StringLiteral = (value) => ({ type: "StringLiteral", value });
export const NullLiteral = () => ({ type: "NullLiteral", value: null });

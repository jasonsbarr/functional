// AST nodes for pattern matching DSL, which includes arbitrary JavaScript expressions
// JavaScript nodes should roughly match the Babel spec
// https://github.com/babel/babel/blob/main/packages/babel-parser/ast/spec.md

// The whole pattern expression, including optional when clause
export const PatternExpression = (pattern, when, expr) => ({
  type: "PatternExpression",
  pattern,
  when,
  expr,
});

// Literals
export const NumericLiteral = (value) => ({ type: "NumericLiteral", value });
export const BigIntLiteral = (value) => ({ type: "BigIntLiteral", value });
export const StringLiteral = (value) => ({ type: "StringLiteral", value });
export const BooleanLiteral = (value) => ({ type: "BooleanLiteral", value });
export const NullLiteral = () => ({ type: "NullLiteral", value: null });
export const UndefinedLiteral = () => ({
  type: "UndefinedLiteral",
  value: undefined,
});

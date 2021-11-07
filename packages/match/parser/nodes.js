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
export const RegExpLiteral = (value) => ({ type: "RegExpLiteral", value });

// Identifier - note that an identifier may be an expression or a destructuring pattern
export const Identifier = (value) => ({ type: "Identifier", value });

// Empty Statement, i.e. a lone semicolon
export const EmptyStatement = () => ({ type: "EmptyStatement" });

// Block statement
export const BlockStatement = (body) => ({ type: "BlockStatement", body });

// Expression statement
export const ExpressionStatement = (expr) => ({
  type: "ExpressionStatement",
  expr,
});

// Function (expression or declaration)
export const FunctionNode = (
  params,
  body,
  { generator = false, async = false, id = null } = {}
) => ({
  type: "Function",
  id,
  params,
  body,
  generator,
  async,
});

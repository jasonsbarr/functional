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

// If statement
export const IfStatement = (cond, then, elseStmnt = null) => ({
  type: "IfStatement",
  cond,
  then,
  else: elseStmnt,
});

// Switch statement and case
export const SwitchStatement = (discriminant, cases) => ({
  type: "SwitchStatement",
  discriminant,
  cases,
});

export const SwitchCase = (test, consequent) => ({
  type: "SwitchCase",
  test,
  consequent,
});

// Loops
export const WhileStatement = (test, body) => ({
  type: "WhileStatement",
  test,
  body,
});

export const DoWhileStatement = (test, body) => ({
  type: "DoWhileStatement",
  test,
  body,
});

export const ForStatement = (init, test, update, body) => ({
  type: "ForStatement",
  init,
  test,
  update,
  body,
});

export const ForInStatement = (left, right, body) => ({
  type: "ForInStatement",
  left,
  right,
  body,
});

export const ForOfStatement = (left, right, body, awaitS = false) => ({
  type: "ForOfStatement",
  left,
  right,
  body,
  await: awaitS,
});

// Variable declaration and declarator
export const VariableDeclaration = (declarations, kind) => ({
  type: "VariableDeclaration",
  declarations,
  kind,
});

export const VariableDeclarator = (id, init) => ({
  type: "VariableDeclarator",
  id,
  init,
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

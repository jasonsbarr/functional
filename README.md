# Fluent Functional Programming in JavaScript

This collection of packages is envisioned as a kind of standard library for functional programming in JavaScript.

The core package will replicate the entire standard library with a (mostly curried) functional interface, adding additional utility functions and functional types for good measure.

The additional packages will add important features not found in standard JavaScript, like immutable collections (with functionalities that leave JS arrays and objects in the dust), additional functional types, and souped-up versions of the standard JS types.

## Installation

```
npm install @jasonsbarr/[package name]
```

## The Packages

Currently there are 6 packages:

### Core

The core package presents much of the JavaScript standard library with a curried, function-based interface and adds important types like Option, Record, and Future. It also contains additional functions for things like function composition and other features not found in standard JavaScript, and an apparatus for creating something about as close as you'll get in JavaScript to discriminated union types (sometimes referred to as Algebraic Data Types) with exhaustive pattern matching.

- [Core package](https://github.com/jasonsbarr/functional/tree/main/packages/core)

### Iterable

While the core package includes a functional interface to arrays, the Iterable package goes above and beyond with nearly 100 functions that will work on both arrays and any indexed iterable collection that meets a simple specification.

- [Iterable package](https://github.com/jasonsbarr/functional/tree/main/packages/iterable)

### Dict

The Dict package adds almost 50 functions that treat Plain Old JavaScript Objects as if they were iterable, immutable keyed collections (a.k.a dictionaries).

- [Dict package](https://github.com/jasonsbarr/functional/tree/main/packages/dict)

### Collections

Collections includes three indexed collections (List, Set, and Tuple) built on the functions in the Iterable package, but with a fluent interface so you can chain operations as you like. The functionality far outstrips that of JavaScript arrays, and Tuples have the added benefit of being immutable. The package also includes the Dict collection, that builds on functions from the Dict package but with some added features like flattening and chaining.

- [Collections package](https://github.com/jasonsbarr/functional/tree/main/packages/collections)

### Concurrency

Concurrency includes the Future, a monadic type for handling concurrent and asynchronous operations in a functional manner. The interface has parity with native JavaScript promises, but with added functionality for mapping, chaining, and so on.

- [Concurrency package](https://github.com/jasonsbarr/functional/tree/main/packages/concurrency)

### Types

The Types package includes additional algebraic types that are more specific in their use cases than those found in the Core package. The backbone of this package is a collection of Monoid types that shine when used for specific operations.

- [Types package](https://github.com/jasonsbarr/functional/tree/main/packages/types)

### String

The String package includes functions to supercharge your strings and a `Str` wrapper type for strings that lets you chain these enhanced string operations.

- [String package](https://github.com/jasonsbarr/functional/tree/main/packages/string)

### Documentation

[Documentation](https://github.com/jasonsbarr/functional/tree/main/docs)

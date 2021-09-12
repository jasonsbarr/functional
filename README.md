# Functional Programming in JavaScript, the Fluent Way

I love functional programming, but I have to use JavaScript for my projects at work. Plus when I use functional programming libraries I miss having a more fluent interface like you get with some object-oriented libraries.

This library is my attempt to have my functional cake and eat a fluent-style object interface too.

## Features

- Optional, Result, and Either types to eliminate null checks and provide better error handling
- Functional helpers for composition, currying, and more
- Collection types with more functionality than what JS arrays give you out-of-the-box
- All monadic types have a fluent interface that lets you chain methods like a boss
- A Future type to represent asynchronous computations without some of the pitfalls of Promises
- Lightweight, immutable Records
- A Nil collection type that represents the empty List and lets you use the collection interface without having to worry about whether a value exists

## Roadmap features

- Functions that will let you treat objects like iterables
- Persistent, immutable collection types
- More types
- A larger collection of utility functions and helpers
- Parity between Future and Promise interfaces

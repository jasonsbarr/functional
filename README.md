# Functional Programming in JavaScript, the Fluent Way

I love functional programming, but I have to use JavaScript for my projects at work. Plus when I use functional programming libraries I miss having a more fluent interface like you get with some object-oriented libraries.

This library is my attempt to have my functional cake and eat a fluent-style object interface too.

Most people who are deeply familiar with functional programming are probably ok with not having a fluent object interface, but I think it might be helpful for people who are new to the functional programming world or just want to be able to do something like use Option for better null checking. I personally prefer having chained methods especially in the absence of a JavaScript pipeline operator.

The [documentation](https://github.com/jasonsbarr/functional/wiki) is a work in progress.

I'm pretty sure there are still tons of bugs, so if you find any feel free to let me know or submit a pull request.

## Features

- The ability to create tagged union types with variants
- Pattern matching on tagged unions with exhaustive variant checking
- Option, Result, and Either types to eliminate null checks and provide better error handling
- Functional helpers for composition, currying, and more
- Collection types with more functionality than what JS arrays give you out-of-the-box
- All monadic types have a fluent interface that lets you chain methods like a boss
- A Future type to represent asynchronous computations without some of the pitfalls of Promises
- Lightweight, immutable Records
- A Nil collection type that represents the empty List and implements the full collection interface

## Roadmap features

- Functions that will let you treat objects like iterables
- Persistent, immutable collection types
- More types
- Implement full Fantasy Land interfaces
- A larger collection of utility functions and helpers
- Lazy collections

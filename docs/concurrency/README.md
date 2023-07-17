# Documentation for Concurrency Package

Concurrency contains types for handling concurrent and asynchronous operations in a functional manner.

## Installation

```
npm install @jasonsbarr/concurrency
```

The package currently contains two types: [Task](./Task.md) and [Future](./Future.md) (both monadic and bifunctors).

Use Tasks to represent an asynchronous/concurrent computation itself, and Futures to represent the **result** of that computation. Also, use Futures if you need parity with the Promise API for some reason.

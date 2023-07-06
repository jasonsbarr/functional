# The Future Type

Futures are an alternative to JavaScript Promises in that they provide an object that represents an asynchronous computation. However, unlike Promises, Futures provide a monadic interface that allows complete flexibility with function composition and your Future values.

## Why Futures?

For more on the problems with JavaScript Promises and how a monadic interface helps to solve them, see [Broken Promises](https://avaq.medium.com/broken-promises-2ae92780f33) by Aldwin Vlasblom (author of the excellent [https://github.com/fluture-js/Fluture](Fluture.js) library).

## Using Futures

You can map and chain over a Future value just like you can with any Monad, just in an asynchronous fashion.

You can create Futures from any value, including Promises _and_ functions that take a Node.js style callback with error and data parameters.

And, like all types in this library, you can do so fluently by chaining methods as needed.

Like Promises, Futures have Pending, Rejected, and Resolved states. Futures also have a Cancelled state, so you can cancel an asynchronous computation before it returns. You can register as many callback handlers as you like for each of the 3 finished states using the `listen` method.

The Futures API has complete parity with that of Promises, plus some extra functional goodies.

Unlike Promises, which are eager, Futures don't actually run until you register callback handlers, so you can do transformations on the values and nothing will actually happen until you use either `listen` or `fork` to register handlers. Since Futures are asynchronous, that also means the computations won't block the main thread, so you can safely use them in data-intensive applications. Plus you can register multiple handlers for the same Future, in case you need to do something like run two separate side effects based on the same value without having those side effects interact or block the main thread.

## API Overview

### Creating a Future

You can create an empty Future using the function constructor:

```js
const f = future(); // note the lower-case f
```

To create a Future that immediately resolves:

```js
const f = Future.of(value);
```

To create a Future that immediately rejects:

```js
const f = Future.rejected(reason);
```

Use the `Future.new` function to create a Future and immediately register callback handlers:

```js
const f = Future.new(
  (reason) => {
    /* handle rejection */
  },
  (value) => {
    /* handle resolution */
  },
  () => {
    /* optional handle cancellation */
  }
);
```

This is the same as:

```js
const f = Future().listen({
  onCancelled: () => {},
  onRejected: (reason) => {},
  onResolved: (value) => {},
});
```

or:

```js
const f = Future().fork(rejectF, resolveF, cancelF);
```

You can create a Future from a Promise:

```js
const f = Future.fromPromise(
  fetch("https://jsonplaceholder.typicode.com/posts/1")
);
```

Or from a function that takes a Node-style callback:

```js
// this example shows off several functions from the library
import fs from "fs";
import { Future } from "@jasonsbarr/concurrency/lib/Future.js";
import { resultToFuture } from "@jasonsbarr/concurrency/lib/conversions/resultToFuture.js";
import { tryCatch } from "@jasonsbarr/functional-core/lib/types/Result.js";
import { isNil } from "@jasonsbarr/functional-core/lib/predicates/isNil.js";

// Note that fromCallback is curried, so these return functions
const readFile = Future.fromCallback(fs.readFile);
const writeFile = Future.fromCallback(fs.writeFile);

readFile("config.json", "utf-8")
  .map((config) => tryCatch(() => JSON.parse(config)))
  .chain(resultToFuture)
  .map((json) => (isNil(json.port) ? { ...json, port: 3333 } : json))
  .chain((data) => writeFile("config-new.json", JSON.stringify(data), "utf-8"))
  .fork(
    (err) => console.error(`Error: ${err}`),
    () => console.log("File written!")
  );
```

Or to create the Future directly, without the intermediary function:

```js
const f = Future.fromCallback(fs.readFile)("path/to/file", "utf-8");
// ... etc.
```

For parity with the Promise API, you can also use `Future.resolve` (an alias for `Future.of`) and `Future.reject` (an alias for `Future.rejected`).

Futures can also be converted _to_ Promises, so you can use `async`/`await`.

Example (`Future.all` returns an array of resolved Futures):

```js
import axios from "axios";

const func = async () => {
  return await Future.all([
    Future.fromPromise(
      axios.get("https://jsonplaceholder.typicode.com/posts/1")
    ),
    Future.fromPromise(
      axios.get("https://jsonplaceholder.typicode.com/posts/2")
    ),
    Future.fromPromise(
      axios.get("https://jsonplaceholder.typicode.com/posts/3")
    ),
    Future.fromPromise(
      axios.get("https://jsonplaceholder.typicode.com/posts/4")
    ),
  ])
    .map((value) => value.map((res) => res.data))
    .map((data) =>
      data.map(
        (post) => `
<div>
  <h2>${post.title}</h2>
  <p>${post.body}</p>
</div>`
      )
    )
    .map((posts) =>
      posts.reduce((htmlStr, html) => htmlStr + html, "<h1>Posts</h1>")
    )
    .promise();
};
```

The result will be the post data inserted into HTML content, wrapped inside a promise since the value is returned from an `async` function, ready to attach to your DOM somewhere in the callback to the promise.

Even better, Futures have a `then` method so you can actually just `await` the Future itself!

### Instance properties and methods

Note that `onCancelled` is always optional unless otherwise noted.

- `state` - the current state of a Future (Pending, Cancelled, Rejected, or Resolved).
- `listeners` - an array of objects holding callback functions for each resolution state.
- `listen({onCancelled, onRejected, onResolved})` - registers callbacks for when the Future is completed.
- `chain(fn)` - takes a function that transforms the Resolve value and returns a new Future. Use this when you want to use `map` but need to avoid nesting your value inside multiple Futures.
- `chainRejected(fn)` - like `chain`, but for a Rejected Future.
- `map(fn)` - takes a function that transforms the Resolved value and returns a new Future.
- `mapRejected(fn)` - same as `map`, but for the Rejected value.
- `bimap(rejectF, resolveF)` - same as `map`, but with a transformation function for both the Rejected and Resolved values.
- `bichain(rejectF, resolveF)` - same as `chain`, but with functions for both Rejected and Resolved Futures.
- `swap(rejToRes, resToRej)` - maps a Resolved value to a Rejection, and vice-versa.
- `ap(otherFuture)` - applies a function wrapped inside a Future to a Future's resolved value.
- `apRejected(otherFuture)` - like `ap`, but for rejected values.
- `alt(otherFuture)` - A chain of `alt`s will return either the first Resolved Future or the last Rejected one.
- `fork(onRejected, onResolved[, onCancelled])` - unwraps the Resolve or Reject value, or performs a callback on Cancelled. Can only be used on a Future that has moved past its Pending state.
- `cancel()` - Cancels the Future.
- `resolve(value)` - Resolves the Future with `value`.
- `reject(reason)` - Rejects the Future with `reason`.
- `finalize(predicate, value[, reason])` Rejects or Resolves the Future based on executing `predicate` with `value` as its argument. Also uses `value` as the Resolve value. Optional `reason` may be supplied for Rejection, otherwise the Reject reason will be `value`.
- `then(resolveF, rejectF)` - included for parity with the Promise API. Note that the order of the callbacks is reversed to maintain parity with Promises. `rejectF` is optional. Registers callbacks only; does _not_ Resolve the Future.
- `catch(rejectF)` - included for parity with the Promise API. Registers callbacks only; does _not_ Reject the Future.
- `finally(fn)` - included for parity with the Promise API. Registers a callback that runs in all cases, rejected, resolved, and cancelled.
- `promise()` - converts the Future to a Promise and returns it.
- `toString()` - returns a string representation of the Future.
- `inspect()` - alias for `toString`.
- `isPending()` - check if a Future is in its Pending state.
- `isCancelled()` - check if a Future has been cancelled.
- `isRejected()` - check if a Future has been rejected.
- `isResolved()` - check if a Future has been resolved.
- `isFuture()` - always returns `true`.

### Static methods

- `Future.new(onRejected, onResolved, onCancelled?)` - creates a new future with listeners for the rejected, resolved, and cancelled cases
- `Future.of(value)` - creates a new Future and immediately Resolves it with `value`.
- `Future.rejected(reason)` - creates a new Future and immediate Rejects it with `reason`.
- `Future.fromPromise(promise)` - creates a new Future from a Promise.
- `Future.fromCallback(fn)(...args)` - (curried) creates a new Future from a function that takes a Node-style callback with `error` and `data` parameters. Calling the method itself returns a function, which can either be saved for future use or immediately invoked by applying its arguments.
- `Future.resolve(value)` - alias for `Future.of`.
- `Future.reject(reason)` - alias for `Future.rejected`.
- `Future.all(futuresIterable)` - takes an iterable of Futures and returns a single Future that either resolves to an iterable (of the same type as the iterable passed into the method) of the Resolved values of all Futures in the original iterable. If a single Future in the iterable is Rejected, the returned Future will also Reject. Can take either an Array or any iterable collection type provided by `@jasonsbarr/collections`. Equivalent to `Promise.all`.
- `Future.allSettled(futuresIterable)` - Similar to `Future.all` but puts all finalized values into the returned iterable, regardless of whether the Futures Rejected or Resolved. Equivalent to `Promise.allSettled`.
- `Future.any(futuresIterable)` - Similar to `Future.all` but Resolves with the value of the first Future in the iterable to Resolve. If all Futures are Rejected, the returned Future will Reject with an iterable of all Reject reasons. Equivalent to `Promise.any`.
- `Future.race(futuresIterable)` - Takes an iterable of Futures and returns a Future that Resolves or Rejects with the value of the first Future in the iterable to either Resolve or Reject. Equivalent to `Promise.race`.
- `Future.isFuture(object)` - Tests whether an object is an instance of Future.
- `Future.resolveAfter(ms, value)` - Creates a Future that resolves after `ms` milliseconds with `value`.
- `Future.rejectAfter(ms, reason)` - Creates a Future that rejects after `ms` milliseconds with `reason`.

## Credit

The Future type is heavily inspired by the Future type from [the old Folktale.js library](https://github.com/origamitower/folktale), which is no longer actively maintained.

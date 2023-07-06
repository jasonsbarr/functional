# The Task Type

Task is a type that models asynchronous computations and supports safe cancellation and resource handling.

Whereas Promises and Futures represent the result of an asynchronous computation, Tasks represent the computation itself.

## Constructing Tasks

use the `task` function to create a Task. `task` takes 2 callbacks: one that rejects, resolves, or cancels the computation and one that cleans up after the computation is finished.

```js
import { task } from "@jasonsbarr/concurrency";

const getDOMElement = (selector) =>
  task(
    (reject, resolve, cancel) => {
      if (cancellationCheck) {
        cancel();
      }

      const elem = document.querySelector(selector);
      if (elem) {
        resolve(elem);
      } else {
        reject(elem);
      }
    },
    () => {}
  );

const appendHTMLToElement = (element, toAppend) =>
  task((_, resolve) => {
    element.insertAdjacentHTML("beforeend", toAppend);
    resolve(element);
  });
```

The `cancel` parameter and cleanup function are optional.

You can also use the static `of`, `rejected`, and `empty` methods to create Tasks.

`of` creates a Task that is resolved immediately:

```js
Task.of(1);
```

`rejected` creates a Task that is immediately rejected:

```js
Task.rejected("BAD TASK, I REJECT YOU");
```

`empty` creates an empty task that will never resolve and is there to satisfy the rules for monoids.

```js
Task.empty();
```

There are also static `fromPromise` and `fromCallback` methods that create functions that convert Promises and Node.js-style continuation callbacks (respectively) into Tasks:

```js
// From a Promise
const taskFetch = Task.fromPromise(fetch);
const fetchJSON = Task.fromPromise((response) => response.json());

// From a Nodeback
import fs from "fs";
const readFile = Task.fromCallback(fs.readFile);
const writeFile = Task.fromCallback(fs.writeFile);
```

## Using Tasks

Task has `map` and `chain` methods for processing the result of a Task. A Task's computation is only performed when you call the `run` method on it:

```js
taskFetch("https://jsonplaceholder.typicode.com/posts/1")
  .chain(fetchJSON)
  .map(
    (post) => `
	<div class="post">
		<h1>${post.title}</h1>
		<div>${post.body}</div>
	</div>
  `
  )
  .chain((html) =>
    getDOMElement(".posts").chain((postsContainer) =>
      appendHTMLToElement(postsContainer, html)
    )
  )
  .run();
```

There are also `mapRejected` for mapping over the rejected case of a Task, `bimap` for mapping over both resolved and rejected cases, and `concat` for concatenating 2 Tasks together (the one that completes first will be passed on).

Handle errors in a composable fashion with the `orElse` method, get the first of 2 Tasks when you only need 1 with `or`, and run 2 Tasks concurrently with `and`.

The static `withAll` method returns an array of Tasks when all have finished, and the static `withAny` method returns the first of a list of Tasks to finish.

# @jasonsbarr/concurrency

A functional type for handling concurrent and asynchronous operations.

Includes the monadic Future type.

## Basic Usage

Import the Future type and use as follows:

```js
import { Future } from "@jasonsbarr/concurrency/lib/Future";

// assume the existence of a handleError function and an addToDom function that appends an HTML string to the DOM
Future.fromPromise(
  fetch("https://jsonplaceholder.typicode.com/posts").then((res) => res.json())
)
  .map((posts) => posts.map((post) => ({ title, body })))
  .map((posts) =>
    posts.reduce(
      (html, post) =>
        (html += `<article class="post">
        <header class="post-header">
            <h1>${post.title}</h1>
        </header>
        <section class="post-body">${post.body}</section>
    </article>`),
      ""
    )
  )
  .fork(
    (err) => handleError(err),
    (posts) => addToDom(posts)
  );
```

## Documentation

[Documentation](https://github.com/jasonsbarr/functional/tree/main/docs/concurrency)

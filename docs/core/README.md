# Documentation for Functional Core Package

## Installation

```
npm install @jasonsbarr/functional-core
```

## Importing Functions and Types

You can import any of the core functions and types from the package's entrypoint, e.g.:

```js
import { pipe } from "@jasonsbarr/functional-core";
```

For library functions, import things individually as you need them. That's better for your bundle sizes anyway, if you're using a module bundler like Webpack in your build process.

I mean, think about it, when you use Ramda, how often do you _need_ the whole package versus just a few functions? We think it's better to be explicit about what you want and what you're doing in your code.

So, for example, if you want to filter an array just import the `filter` function:

```js
import { filter } from "@jasonsbarr/functional-core/lib/array/filter";
import { isEven } from "@jasonsbarr/functional-core/lib/predicates/isEven";

filter(isEven, [1, 2, 3, 4, 5, 6, 7, 8]); // -> [2, 4, 6, 8]
```

All core functions and types can be imported from `/lib/core`:

```js
import { createType } from "@jasonsbarr/functional-core/lib/core/createType";
```

## Function Categories

- [Array](./Array.md)
- [Date](./Date.md)
- [Helpers](./Helpers.md)
- [Lambda](./Lambda.md)
- Math
- Number
- Object
- Predicates
- RegExp
- [String](./String.md)
- Symbol
- Type conversions
- [Type creation and matching](./CreatingTypes.md)

## Available Types

- [Either](./Either.md)
- [Id](./Id.md)
- [Option](./Option.md)
- [Record](./Record.md)
- [Result](./Result.md)

## Creating Your Own Types

To create your own types, use the `createType` function.

To import `createType`:

```js
import { createType } from "@jasonsbarr/functional-core";
```

Then simply give `createType` the name of your type, an array of information about any variants, and an object of any methods or properties you want to have on the type representative object.

[More on Creating Types](./CreatingTypes.md)

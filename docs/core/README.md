# Documentation for Functional Core Package

## Importing Functions and Types

There is no single file to import that gives you all the functions and types, you'll need to import things individually as you need them. That's better for your bundle sizes anyway, if you're using a module bundler like Webpack in your build process.

I mean, think about it, when you use Ramda, how often do you _need_ the whole `_` package versus just a few functions? We think it's better to be explicit about what you want and what you're doing in your code.

So, for example, if you want to filter an array just import the `filter` function:

```js
import { filter } from "@jasonsbarr/functional-core/lib/array/filter";
```

## Function Categories

- Array
- Boolean
- Helpers
- Lambda
- Math
- Number
- Object
- Predicates
- RegExp
- String
- Symbol
- Type conversions
- [Type creation and matching](./CreatingTypes.md)

## Available Types

- [Either](./Either.md)
- [Future](./Future.md)
- [Id](./Id.md)
- [Option](./Option.md)
- [Record](./Record.md)
- [Result](./Result.md)

## Creating Your Own Types

To create your own types, use the `createType` function. There are also base type class implementations for several Fantasy Land type classes with default method implementations for several of them.

To import `createType`:

```js
import { createType } from "@jasonsbarr/functional-core/lib/types/createType";
```

Then simply give `createType` the name of your type, an array of information about any variants, and an object of any methods or properties you want to have on the type representative object.

[More on Creating Types](./CreatingTypes.md)

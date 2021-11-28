# Creating Your Own Types

To create your own types, use the `createType` function. There are also base type class implementations for several Fantasy Land type classes with default method implementations for several of them.

You can import `createType` from the main entry point of the core library:

```js
import { createType } from "@jasonsbarr/functional-core";
```

Then simply give `createType` the name of your type, an array of information about any variants, and an object of any methods or properties you want to have on the type representative object.

Note that a type _must_ have at least 1 variant. If a type only has 1 variant, you can treat its constructor as the type representative and attach static methods to it.

We call types created by this function tagged union types, which you may also see called "variant types" in other languages.

## The Anatomy of a Tagged Union Type

A tagged union type has two parts: the type representative and variants. The variant constructor functions are implemented as methods on the type representative object. You can also define additional methods and properties on the type representative as the last argument to `createType`.

A variant instance has a `value` property that holds whatever single value is passed to its constructor. In your variant info, you can provide an `init` method to manipulate this value, do data validation, and anything else you need to do with it. An example is provided below.

You can pre-define fields that will go on the `value` property in the second property of your variant info, which should be an array of string field names. An example is given below. Defining fields will ensure only those fields get values on the created instance. If you don't define fields, the `value` property will get whatever value is passed to the constructor, or a "tuple" (really, a JavaScript array) of values if you pass multiple values to the constructor.

Variant instances also automatically get the type name, the variant name, a predicate identifying it as an instance of the type, another predicate for the variant, a `valueOf` method to get the value, and `inspect` and `toString` methods.

Using `valueOf` is discouraged except in the case of single-variant types in favor of using a `fold` method or the `switchType` function, but it's there if you need it.

## Providing Your Variant Info

To help with creating your variants, there is a `VariantInfo` helper function:

```js
import { VariantInfo } from "@jasonsbarr/functional-core";
```

`VariantInfo` takes the name of the variant, an array of type classes, an object with any methods you want to attach to the variant, and another object with information you want to attach to the variant constructor as static methods and properties.

Note that when defining methods for your variant instance, if you need to access `this` you'll need to define your method as either a `function` function or using the shorthand method syntax available from ES2015. Due to how arrow functions work, trying to access `this` in an arrow function will cause an error.

## Creating a Type

The simplest type creation just involves giving `createType` the name of your type and the names of your variants:

```js
import { createType, VariantInfo } from "@jasonsbarr/functional-core";

/**
 * type HttpStates
 *   | Pending
 *   | Error of 'Error
 *   | Success of 'Value
 */
const variantInfos = [
    VariantInfo("Pending"),
    VariantInfo("Error"),
    VariantInfo("Success")
];

export const HttpState = createType("HttpState", variantInfos);
```

Now you can create any variant and give it a value using its constructor:

```js
const error = HttpState.Error(errorObject);
```

## Matching on a Type

To match on a type and extract its value, use the `switchType` function:

```js
import { switchType } from "@jasonsbarr/functional-core";
import { HttpState } from "./HttpState";

switchType(
    HttpState,
    {
        Pending: () => console.log("Still pending!"),
        Error: (error) => console.error(error),
        Success: (value) => console.log(value)
    },
    instance
);
```

`switchType` takes the type representative object, an object with a function to dispatch for each possible variant, and the type instance itself. When dispatching a function it passes the variant instance's `value` property into the function. If you need a return value, it returns the value returned by the function executed on match.

Note that matching is exhaustively checked at runtime - you _must_ provide a case for _every_ possible variant unless you use `_` as a catchall (example of this below).

## Automatically-Created Methods

When you create a type, the type representative object and variant instances automatically get the following methods:

- Type representative
    - "is" + typeName(x) - predicate that takes a value, `x`, and checks if `x` is an instance of the type
    - "is" + variantName(x) - for each variant, checks if `x` is an instance of that particular variant
- Variant instance
    - "is" + typeName() - predicate that returns `true` because it is an instance of `typeName`
    - "is" + variantName() - only for its variant, predicate that returns `true` because it is an instance of `variantName`
    - valueOf() - returns the `value` property of the variant object
    - inspect() - returns a string representation of the variant
    - toString() - alias for `inspect`

Note that any of these can be overridden in type creation.

## Creating a More Complex Type

Let's say you want to create a type to represent an email address so you can validate the email on type creation. Here's how you might do that:

```js
import { createType, VariantInfo } from "@jasonsbarr/functional-core";
import { Apply, Applicative, Fold, Functor, Chain } from "@jasonsbarr/functional-core/lib/types/typeClasses";
import { isFunction } from "@jasonsbarr/functional-core/lib/predicates/isFunction";

/**
 * type EmailAddress of string
 */
const variantInfos = [
    VariantInfo(
        "EmailAddress",
        [],
        [
            // for this type, the default method implementations will work
            Fold,
            Functor,
            Chain,
            Apply
        ],
        {
            init() {
                if (!validateEmailAddress(this.value)) {
                    // handle invalid email case
                    // the types package contains a Validation type
                    // for doing exactly this sort of thing
                }
            }
        },
        {
            // since there's only 1 variant we'll treat its constructor like the type representative
            // this means attaching the type class for the type representative and type predicate to it
            sTypeclasses: [Applicative],
            methods: {
                // of method is required by Applicative type class
                of(value) {
                    return EmailAddress.EmailAddress(value);
                },

                // type predicate uses a method automatically created on the variant instance
                isEmailAddress(x) {
                    return x && isFunction(x.isEmailAddress) && x.isEmailAddress();
                },

                // this is necessary if you want to be able to use switchType to extract the value, since
                // we're treating the constructor as if it were the type representative
                variants: ["EmailAddress"]
            }
        }
    )
];

export const { EmailAddress } = createType("EmailAddress", variantInfos);
```

## Creating a Type with Multiple Variants

In the case of multiple variants, you'll want any of the type representative typeclasses and static methods to be defined on the type representative object itself, not on a single variant's constructor.

### Arguments to `VariantInfo`

- `variantName` (string)
- `fields` (array of strings)
- `typeClasses` (array of typeClasses)
- `overrides` - methods on the variant instance (object of method definitions)
- `statics` - typeClasses and methods on the variant constructor (object with the following 2 fields)
    - `sTypeClasses` - typeClasses implemented on the variant constructor (array of typeClasses)
    - `methods` - static methods on the constructor (object of method definitions)

### An Example of a More Complex Type

Let's create a union type to represent the possible states of an HTTP request that's a little more detailed than the one above, and let's use some of the predefined type classes to do it:

```js
import { createType, VariantInfo } from "@jasonsbarr/functional-core";
import {
    Apply,
    Applicative,
    RightFold,
    Functor,
    Chain,
    Monoid,
    SemiGroup,
    Setoid,
    LeftApply,
    LeftFold,
    LeftFunctor,
    LeftChain,
    LeftSemiGroup
} from "@jasonsbarr/functional-core/lib/types/typeClasses";

const variantInfos = [
    // Pending isn't really a "Left" state, but it has no value so it's simpler to treat it as one
    VariantInfo("Pending", [], [
        LeftApply, // ap method
        LeftFold, // fold method
        LeftFunctor, // map method
        LeftChain, // chain method
        LeftSemiGroup, // concat method
        Setoid // equals method
    ],
    {
        // all 3 variants need to have the same methods, so we need to define an appropriate version of mapError
        mapError(fn) {
            return this;
        },

        // Replace the default method that comes with the Setoid type class
        equals(other) {
            return other.type === HttpStates && other.variant === "Pending";
        },

        // The predefined concat method that comes with LeftSemiGroup won't work either
        concat(other) {
            return other;
        },

        // need a Fold case for all 3 states
        fold(pendingFn, errorFn, successFn) {
            return pendingFn();
        }
    }),
    VariantInfo("Error", [], [
        LeftApply,
        LeftFold,
        LeftFunctor,
        LeftChain,
        LeftSemiGroup,
        Setoid
    ],
    {
        mapError(fn) {
            return HttpStates.Error(fn(this.value));
        },

        fold(pendingFn, errorFn, successFn) {
            return errorFn(this.value);
        }
    }),
    VariantInfo("Success", [
        Apply,
        Fold,
        Functor,
        Chain,
        SemiGroup,
        Setoid
    ],
    {
        mapError(fn) {
            return this;
        },

        fold(pendingFn, errorFn, successFn) {
            return successFn(this.value);
        }
    })
];

export const HttpState = createType("HttpState", variantInfos, [Applicative, Monoid], {
    // Required for Applicative
    of(value) {
        return HttpState.Success(value);
    },

    // Required for Monoid
    empty() {
        return HttpState.Pending();
    }
});
```

## Creating a type with pre-defined fields

You can pass an array of string field names as the second parameter of your variant info. These fields will be available on the `value` property of the variant instance, and you can pass values as multiple arguments to the variant constructor.

### A simple example

```js
/**
 * type Point of {
 *   x: number,
 *   y: number
 * }
 */
const variantInfos = [
    VariantInfo("Point", ["x", "y"])
];

const { Point } = createType("Point", variantInfos);

// creating a Point
const origin = Point(0, 0);

origin.valueOf(); // -> {x: 0, y: 0}
```

Without the named fields you would have to have passed an object to the constructor, e.g.

```js
Point({x: 0, y: 0});
```

Extra values passed to the constructor will be ignored:

```js
const p = Point(1, 2, 3);

p.valueOf(); // -> {x: 1, y: 2}
```

Having the named fields makes it cleaner and allows you to just pass values to your constructor instead of having to worry about having a specific object shape.

### Creating variants with different fields

Each variant can have its own unique set of fields.

```js
/**
 * type Shape
 *   | Circle of radius: number
 *   | Rectangle of {
 *      width: number,
 *      height: number }
 *   | Triangle of {
 *      base: number,
 *      height: number }
 */
const variantInfos = [
    VariantInfo("Circle"),
    VariantInfo("Rectangle", ["width", "height"]),
    VariantInfo("Triangle", ["base", "height"])
];

const Shape = createType("Shape", variantInfos, [], {
    area(shape) {
        return switchType(
            Shape,
            {
                Circle: (radius) => Math.PI * radius * radius,
                Rectangle: ({ width, height }) => width * height,
                Triangle: ({ base, height }) => (base * height) / 2
            },
            shape
        );
    }
});
const { Circle, Rectangle, Triangle } = Shape;

// create a Shape
const rect = Rectangle(4, 5);

rect.valueOf(); // -> {width: 4, height: 5}
Shape.area(rect); // -> 20
```

## Creating a type with a "tuple" value

You can simulate a tuple value for your custom type by defining no fields when constructing your type and then passing multiple arguments to the variant constructor. Only do this with very simple values for types. Here is an example of the Point type with a "tuple" value:

```js
/**
 * type Point of number * number
 */
const variantInfos = [
    VariantInfo("Point", [], [], {
        distance({ value: value2 }) {
            const value1 = this.value;
            const distX = value2[0] - value1[0];
            const distY = value2[1] - value1[1];
            return Math.sqrt((distX * distX) + (distY * distY));
        }
    })
];

const { Point } = createType("Point", variantInfos);

const origin = Point(0, 0);
const point1 = Point(3, 4);

origin.valueOf(); // -> [0, 0]
point1.valueOf(); // -> [3, 4]
origin.distance(point1); // -> 5
```

## Using a catchall with `switchType`

You can use `_` as a catchall with `switchType` when you don't need a specific case for every single variant.

```js
const HttpState = createType("HttpState", [
    VariantInfo("Pending"),
    VariantInfo("Error"),
    VariantInfo("Success")
]);

export const foldHttpState = (state) => switchType(
    "HttpState",
    {
        Pending: () => "Pending",
        _: (value) => value
    },
    state
);
```

## Type Classes

You can use the type classes included or create your own. For our purposes, a type class is just an object with one or more methods on it.

While we've made some effort to comply with the Fantasy Land spec details, we've also created some of our own for ease of implementation. Note especially the existence of "Right" and "Left" variants of some type classes, intended for use with a type like `Either` that treats its values differently based on whether it's a `Left` or `Right` variant.

Note also that some type classes require you to provide your own method implementation. We still think it's worth using the type classes even if you're going to override default methods or have to provide your own for a given type class, at least for documentation purposes so you can tell at a glance what capabilities a given variant has.

### For Variant Instances:

- Fold
- RightFold
- Functor
- Apply
- Chain
- Bifunctor
- RightBifunctor
- RightBichain
- RightAlt
- SemiGroup
- RightSemiGroup
- Setoid
- Ord
- Traversable
- Swap
- LeftFold
- LeftFunctor
- LeftApply
- LeftChain
- LeftBifunctor
- LeftBichain
- LeftAlt
- LeftSemiGroup

### For Type Representatives

- Applicative
- Monoid
- Plus

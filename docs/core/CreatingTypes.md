# Creating Your Own Types

To create your own types, use the `createType` function. There are also base type class implementations for several Fantasy Land type classes with default method implementations for several of them.

To import `createType`:

```js
import { createType } from "@jasonsbarr/functional-core/lib/types/createType";
```

Then simply give `createType` the name of your type, an array of information about any variants, and an object of any methods or properties you want to have on the type representative object.

Note that a type _must_ have at least 1 variant. If a type only has 1 variant, you can treat its constructor as the type representative and attach static methods to it.

## The Anatomy of a Union Type

A union type has two parts: the type representative and variants. The variant constructor functions are implemented as methods on the type representative object. You can also define additional methods and properties on the type representative as the last argument to `createType`.

A variant instance has a `value` property that holds whatever single value is passed to its constructor. In your variant info, you can provide an `init` method to manipulate this value, do data validation, and anything else you need to do with it. An example is provided below.

Variant instances also automatically get the type name, the variant name, a predicate identifying it as an instance of the type, another predicate for the variant, and `inspect` and `toString` methods.

## Providing Your Variant Info

To help with creating your variants, there is a `VariantInfo` helper function in the `createType` module:

```js
import { VariantInfo } from "@jasonsbarr/functional-core/lib/types/createType";
```

`VariantInfo` takes the name of the variant, an array of type classes, an object with any methods you want to attach to the variant, and another object with information you want to attach to the variant constructor as static methods and properties.

Note that when defining methods for your variant instance, if you need to access `this` you'll need to define your method as either a `function` function or using the shorthand method syntax available from ES2015. Due to how arrow functions work, trying to access `this` in an arrow function will cause an error.

### Creating a Type

The simplest type creation just involves giving `createType` the name of your type and the names of your variants:

```js
import { createType, VariantInfo } from "@jasonsbarr/functional-core/lib/types/createType";

const variantInfos = [
    VariantInfo("Pending"),
    VariantInfo("Error"),
    VariantInfo("Success")
];

export const HttpStates = createType("HttpStates", variantInfos);
```

Now you can create any variant and give it a value using its constructor:

```js
const error = HttpStates.Error(errorObject);
```

Let's say you want to create a type to represent an email address. Here's how you might do that:

```js
import { createType, VariantInfo } from "@jasonsbarr/functional-core/lib/types/createType";
import { Apply, Applicative, Fold, Functor, Chain } from "@jasonsbarr/functional-core/lib/types/typeClasses";
import { isFunction } from "@jasonsbarr/functional-core/lib/predicates/isFunction";

const variantInfos = [
    VariantInfo(
        "EmailAddress",
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
                }
            }
        }
    )
];

export const { EmailAddress } = createType("EmailAddress", variantInfos);
```

## Creating a Type with Multiple Variants

In the case of multiple variants, you'll want any of the type representative typeclasses and static methods to be defined on the type representative object itself, not on a single variant's constructor.

For example, let's create a union type to represent the possible states of an HTTP request that's a little more detailed than the one above:

```js
import { createType, VariantInfo } from "@jasonsbarr/functional-core/lib/types/createType";
import {
    Apply,
    Applicative,
    RightFold,
    Functor,
    Chain,
    Monoid,
    SemiGroup,
    LeftApply,
    LeftFold,
    LeftFunctor,
    LeftChain,
    LeftSemiGroup
} from "@jasonsbarr/functional-core/lib/types/typeClasses";

const variantInfos = [
    // Pending isn't really a "Left" state, but it has no value so it's simpler to treat it as one
    VariantInfo("Pending", [
        LeftApply,
        LeftFold,
        LeftFunctor,
        LeftChain,
        LeftSemiGroup
    ],
    {
        mapError(fn) {
            return this;
        }
    }),
    VariantInfo("Error", [
        LeftApply,
        LeftFold,
        LeftFunctor,
        LeftChain,
        LeftSemiGroup
    ],
    {
        mapError(fn) {
            return HttpStates.Error(fn(this.value));
        }
    }),
    VariantInfo("Success", [
        Apply,
        Fold,
        Functor,
        Chain,
        SemiGroup
    ],
    {
        mapError(fn) {
            return this;
        }
    })
];

export const HttpStates = createType("HttpStates", variantInfos, [Applicative, Monoid], {
    // Required for Applicative
    of(value) {
        return HttpStates.Success(value);
    },

    // Required for Monoid
    empty() {
        return HttpStates.Pending();
    }
});
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
- RightSemigroup
- Setoid
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

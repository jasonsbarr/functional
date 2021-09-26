# Validation Type

The `Validation` type is a Left/Right monadic type, similar to `Option` or `Result`. Unlike those two, which short-circuit when you get into the Left case, `Validation` continues to aggregate failures in an array kept in the `Failure` instance on the `messages` property. This makes it ideal for tasks like validating form fields, where you may have more than one error you need to aggregate.

You aggregate errors by using the `concat` method, which in the case of errors will put errors into an array kept in its `messages` property.

## Importing Validation

```js
import { Validation, Success, Failure, succeed, fail } from "@jasonsbarr/types/lib/Validation";
```

## Usage Example: Using Validation for a Form Field in a React App

```js
import { useState } from "react";
import { Validation, succeed, fail } from "@jasonsbarr/types/lib/Validation";
import { gte } from "@jasonsbarr/functional-core/lib/predicates/gte";
import { length as strLength } from "@jasonsbarr/functional-core/lib/string/length";
import { test } from "@jasonsbarr/functional-core/lib/regexp/test";
import { length } from "@jasonsbarr/functional-core/lib/array/length";

// This is not necessarily how you should handle your form field state - this is not a React tutorial
const [passFieldState, setPassFieldState] = useState("");
const [passFieldErrors, setPassFieldErrors] = useState([]);

const isPasswordLongEnough = (password) =>
    gte(strLength(password), 10)
        ? succeed(password)
        : fail(password, "Password must be at least 10 characters long");

const doesPasswordContainSpecialChars = (password) =>
    test(/#!\.#\*&\^%\$\?\\\/@/, password)
        ? succeed(password)
        : fail(password, "Password must contain at least one special character")

const isPasswordValid = (password) =>
    Validation.empty()
        .concat(isPasswordLongEnough(password))
        .concat(doesPasswordContainSpecialChars(password))

const handlePasswordFieldChange = (event) => {
    isPasswordValid(event.target.value)
        .fold(
            ({ value, messages }) => {
                setPassFieldState(value);
                setPassFieldErrors(messages);
            },
            ({ value }) => {
                setPassFieldState(value);
                setPassFieldErrors([]);
            }
        )
};

// For demonstration purposes only - this is not a React tutorial
export default function PasswordField() {
    return (
        <div className="form-control">
            {gte(length(passFieldErrors), 1) && <p className="error">{passFieldErrors[0]}</p>}
            <input type="password" value={passFieldState} onChange={handlePasswordFieldChange} />
        </div>
    );
}
```

## Constructors

All can be imported as standalone functions, or called as static methods on the `Validation` object.

- `Success(value)` - takes `value` as its value
- `Failure(failureObj)` - `failureObj` needs `value` and `message` properties or else the constructor will throw an error; probably better to use the shorthand `fail` function as it constructs the object behind the scenes
- `succeed(value)` - constructs a `Success` variant holding `value`
- `fail(value, message)` - constructs a `Failure` variant with `value` as its value and `message` as its error message
- `of(value)` - constructs a `Success`
- `empty()` - constructs an empty `Success`

## Instance Methods

- `alt(other)` - a chain of `alt`s returns the first `Success` or last `Failure` found
- `ap(other)`
- `concat(validation)`
- `map(fn)`
- `mapFailure(fn)`
- `bimap(failFn, successFn)`
- `fold(failFn, successFn)`
- `swap(failMessage)` - `failMessage` is applied in the case of swapping a `Success` to a `Failure`
- `equals(other)`

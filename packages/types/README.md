# @jasonsbarr/types

A set of functional types and type-related conversions to supplement the core package types.

## Basic Usage

Just import and use the types you need. For example, doing form field validation in a React app:

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
    test(/#!\.#\*&\^%\$\?\\\//, password)
        ? succeed(password)
        : fail(password, "Password must contain at least one special character")

const isPasswordValid = (password) =>
    Validation.empty()
        .concat(isPasswordLongEnough(password))
        .concat(doesPasswordContainSpecialChars(password))

const passwordFieldChange = (event) => {
    isPasswordValid(event.target.value)
        .fold(
            ({ value, messages }) => {
                setPassFieldState(value);
                setPassFieldErrors(messages);
            },
            (value) => {
                setPassFieldState(value);
                setPassFieldErrors([]);
            }
        )
};

// For demonstration purposes only - this is not a React tutorial
export default function PasswordField() {
    return (
        <div className="form-control">
            {length(passFieldErrors) && <p className="error">{passFieldErrors[0]}</p>}
            <input type="password" value={passFieldState} />
        </div>
    );
}
```

## Documentation

[Documentation](https://github.com/jasonsbarr/functional/tree/main/docs/types)

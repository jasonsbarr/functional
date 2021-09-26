# @jasonsbarr/dict

A collection of functions that treat Plain Old JavaScript Objects as iterable, keyed collections (a.k.a. Dictionaries).

Note that returned objects will have a `null` prototype. This is to give you the greatest flexibility with your allowable keys.

## Basic Usage

Import and use only the functions you need:

```js
import { filter } from "@jasonsbarr/dict/lib/filter";
import { endsWith } from "@jasonsbarr/functional-core/lib/string/endsWith";

const contacts = {
    john: "john.doe@gmail.com",
    jimmy: "jimmy@yahoo.com",
    jane: "jane-the-awesome@gmail.com",
    jeremy: "jeremy@msn.com"
};

const gmailContacts = filter(contact => endsWith("@gmail.com", contact), contacts);
```

## Documentation

[Documentation](https://github.com/jasonsbarr/functional/tree/main/docs/dict)

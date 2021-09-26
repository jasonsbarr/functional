# Record Type

`Records` are immutable objects intended to hold values of different types. Records have a predefined set of keys, and attempts to assign any keys not specified to the constructor will be discarded.

## Importing Record

```js
import { Record, record } from "@jasonsbarr/functional-core/lib/types/Record";
```

## Usage

### The Constructor Constructor

`Record` takes a comma-separated list of string keys and returns a function that takes values and returns an immutable record.

```js
const Person = Record("name", "age", "occupation");
const jason = Person("Jason", 41, "developer");

jason["spouse"] = "Gretchen"; // not assigned
```

You can also use the constructor's `of` method to create a record from an object:

```js
const daniel = Person.of({ name: "Daniel", age: 8, occupation: "student" });
```

For one-off records when creating a constructor creates unnecessary overhead, use the `record` function:

```js
const cat = record({ name: "Phoenix", breed: "domestic shorthair", color: "grey tabby" });
```

## Record Constructor Methods

- `isRecord()`

## Record Instance Methods

Note that no records are mutated by any of these methods; the result of methods that change the data in a record is a new, immutable record with the changed data.

- `clear()`
- `clone()`
- `copy()`
- `delete(key)`
- `entries()`
- `equals(other)`
- `get(key)` - returns `Option`
- `getWithDefault(key, defaultValue)`
- `has(key)`
- `hash()`
- `hashEquals(other)`
- `index(value)`
- `inspect()`
- `isRecord()`
- `keys()`
- `merge(...others)`
- `set(key, value)` - note: only works with predefined keys or, when using the `record` function, keys that are already created
- `toJSON()`
- `toObject()`
- `toQueryString()`
- `toString()`
- `update(key, updater)` - updater is a function used to compute the updated value
- `values()`
- `valueOf()` - returns a plain object of the record's keys and values

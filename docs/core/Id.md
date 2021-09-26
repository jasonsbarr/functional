# Id Type

Monadic type for putting values in a "box" so you can `map` and compose functionally over them.

## Importing Id

```js
import { Id } from "@jasonsbarr/functional-core/lib/types/Id";
```

## Constructors

- `Id(x)`
- `Id.of(x)`

## Constructor Methods

- `Id.isId(x)`
- `Id.empty()` - returns an empty `Id`

## Instance Methods

- `map(fn)`
- `chain(fn)`
- `fold(fn)`
- `inspect()`
- `concat(other)`
- `ap(other)` - applies a function lifted into `other`, an `Id`, to an argument also wrapped in an `Id`
- `equals(other)`

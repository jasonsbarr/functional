# Date Functions

Functional interface to the `Date` object and its methods in the JavaScript standard library.

Assume functions that take multiple arguments are curried and can be partially applied unless stated otherwise.

Note that none of these functions mutate their arguments. A new value is always returned.

## date

Constructs a new `Date` object.

- `date()` - creates a `Date` from the current date/time.
- `date(number)` - creates a `Date` from `number` as a timestamp in milliseconds since 1/1/1970 00:00:00 UTC.
- `date(year)` - values from 0-99 map to 1900-1999; for years in other centuries use the full 4-digit year.
- `date(year, month)` - `month` is indexed from 0 (January) to 11 (December); numbers greater than 11 will be added to the date. Defaults to 0.
    - e.g. `date(1990, 12)` will return the `Date` for January 1, 1991 at 00:00:00 UTC.
- `date(year, month, day)' - `day` is the integer day of the month, starting with 1. Defaults to 1.
- `date(year, month, day, hour)` - `hour` is an integer from 0 to 23. Defaults to 0.
- `date(year, month, day, hour, minute)` - `minute` is an integer ranging from 0-59. Defaults to 0,
- `date(year, month, day, hour, minute, second)` - `second` is an integer ranging from 0-59. Defaults to 0.
- `date(year, month, day, hour, minute, second, millisecond)` - `millisecond` is an integer ranging from 0 - 999. Defaults to 0.
- `date(dateString)` - parses `dateString` and creates a `Date` from it.

Import:

```js
import { date } from "@jasonsbarr/functional-core/lib/date/date";
```

Usage:

```js
const moonLanding = date("July 20, 1969 00:20:18:123");
```

## getDate

Returns the day of the month for `date` as an integer according to local time.

- `getDate(date)`

Import:

```js
import { getDate }  from "@jasonsbarr/functional-core/lib/date/getDate";
```

Usage:

```js
getDate(moonLanding); // -> 20
```

## getDay

Returns the day of the week as an integer from 0 (Sunday) to 6 (Saturday).

- `getDay(date)`

Import:

```js
import { getDay }  from "@jasonsbarr/functional-core/lib/date/getDay";
```

Usage:

```js
getDay(moonLanding); // -> 0
```

## getFullYear

Returns the year of `date` as an integer.

- `getFullYear(date)`

Import:

```js
import { getFullYear }  from "@jasonsbarr/functional-core/lib/date/getFullYear";
```

Usage:

```js
getFullYear(moonLanding); // -> 1969
```

## getHours

Returns the hours in the `date`.

- `getHours(date)`

Import:

```js
import { getHours } from "@jasonsbarr/functional-core/lib/date/getHours";
```

Usage:

```js
getHours(moonLanding); // -> 0
```

## getMilliseconds

Returns the milliseconds in a `Date` object as an integer. Note: returns the number of milliseconds specified in the constructor, not the total number of milliseconds for any given span of time.

- `getMilliseconds(date)`

Import:

```js
import { getMilliseconds } from "@jasonsbarr/functional-core/lib/date/getMilliseconds";
```

Usage:

```js
getMilliseconds(moonLanding); // -> 123
```

## getMinutes

Returns the number of minutes in a `Date` object.

- `getMinutes(date)`

Import:

```js
import { getMinutes } from "@jasonsbarr/functional-core/lib/date/getMinutes";
```

Usage:

```js
getMinutes(moonLanding); // -> 20
```

## getMonth

Return the zero-based month as an integer, e.g. 0 is for January.

- `getMonth(date)`

Import:

```js
import { getMonth } from "@jasonsbarr/functional-core/lib/date/getMonth";
```

Usage:

```js
getMonth(moonLanding); // -> 6
```

## getSeconds

Return the seconds in a `Date` object.

- `getSeconds(date)`

Import:

```js
import { getSeconds } from "@jasonsbarr/functional-core/lib/date/getSeconds";
```

Usage:

```js
getSeconds(moonLanding); // -> 18
```

# getTime

Returns the number of milliseconds since the beginning of the Unix epoch (January 1, 1970, 00:00:00:000 UTC) as an integer.

- `getTime(date)`

Import:

```js
import { getTime } from "@jasonsbarr/functional-core/lib/date/getTime";
```

Usage:

```js
getTime(moonLanding); // -> -14236781877
```

## getTimezoneOffset

Get the offset in minutes between a date as evaluated in UTC and the same date as evaluated in the local timezone.

- `getTimezoneOffset(date)`

Import:

```js
import { getTimezoneOffset } from "@jasonsbarr/functional-core/lib/date/getTimezoneOffset";
```

Usage:

```js
getTimezoneOffset(moonLanding); // -> 300 (for CDT)
```

## getUTCDate

Returns the day of the month (from 1 to 31) of the specified date according to UTC time.

- `getUTCDate(date)`

Import:

```js
import { getUTCDate } from "@jasonsbarr/functional-core/lib/date/getUTCDate";
```

Usage:

```js
const d = date("August 19, 1975 23:15:30 GMT-11:00");
getUTCDate(d); // -> 20
```

## getUTCDay

Returns the day of the week (from 0 to 6) of the specified date according to UTC time.

- `getUTCDay(date)`

Import:

```js
import { getUTCDay } from "@jasonsbarr/functional-core/lib/date/getUTCDay";
```

Usage:

```js
getUTCDay(d); // -> 3
```

## getUTCFullYear

Returns the 4-digit year of the specified date according to UTC time.

- `getUTCFullYear(date)`

Import:

```js
import { getUTCFullYear } from "@jasonsbarr/functional-core/lib/date/getUTCFullYear";
```

Usage:

```js
const lastYear = date("December 31, 1975, 23:15:30 GMT-11:00");
getUTCFullYear(lastYear); // -> 1976
```

## getUTCHours

Returns the hours in the specified date according to UTC time.

- `getUTCHours(date)`

Import:

```js
import { getUTCHours } from "@jasonsbarr/functional-core/lib/date/getUTCHours";
```

Usage:

```js
getUTCHours(lastYear); // -> 10
```

## getUTCMilliseconds

Returns the milliseconds in the specified date according to UTC time.

- `getUTCMilliseconds(date)`

Import:

```js
import { getUTCMilliseconds } from "@jasonsbarr/functional-core/lib/date/getUTCMilliseconds";
```

Usage:

```js
const exampleDate = date("2018-01-02T03:04:05.678Z");
getUTCMilliseconds(exampleDate); // -> 678
```

## getUTCMinutes

Returns the minutes in the specified date according to UTC time.

- `getUTCMinutes(date)`

Import:

```js
import { getUTCMinutes } from "@jasonsbarr/functional-core/lib/date/getUTCMinutes";
```

Usage:

```js
getUTCMinutes(exampleDate); // -> 4
```

## getUTCMonth

Returns the month as an integer from 0 (January) to 11 (December) according to UTC time.

- `getUTCMonth(date)`

Import:

```js
import { getUTCMonth } from "@jasonsbarr/functional-core/lib/date/getUTCMonth";
```

Usage:

```js
getUTCMonth(lastYear); // -> 0
```

## getUTCSeconds

Returns the number of seconds in a date according to UTC time.

- `getUTCSeconds(date)`

Import:

```js
import { getUTCSeconds } from "@jasonsbarr/functional-core/lib/date/getUTCSeconds";
```

Usage:

```js
getUTCSeconds(moonLanding); // -> 4
```

## now

Returns a `Date` object with the value of right now.

- `now()`

Import:

```js
import { now } from "@jasonsbarr/functional-core/lib/date/now";
```

Usage:

```js
const rightNow = now(); // -> right now
```

## parse

Parses a string representation of a date and returns the number of milliseconds since the start of the Unix epoch (January 1, 1970 00:00:00:000).

- `parse(dateStr)`

Import:

```js
import { parse } from "@jasonsbarr/functional-core/lib/date/parse";
```

Usage:

```js
const javascriptRelease = parse("04 Dec 1995 00:12:00 GMT"); // -> 818035920000
```

## setDate

Sets the day of the month of `date` to the specified `dayOfMonth` based on local time.

- `setDate(24, date)`;

Import:

```js
import { setDate } from "@jasonsbarr/functional-core/lib/date/setDate";
```

Usage:

```js
setDate(24, date("December 21, 1970 10:00:30"));
```

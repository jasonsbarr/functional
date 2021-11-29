# Documentation for Collections Package

## Installation

```
npm install @jasonsbarr/collections
```

## Usage

Import a collection:

```js
import { LinkedList } from "@jasonsbarr/collections";
```

## Collection Types

- Dict - a hash table or dictionary-like data structure intended for use with single-type values (string or symbol keys only)
- List - a linked list using Array-based cells
- Nil - represents the empty List for safe use with what would otherwise be `null` and `undefined` values
- Range - if all you need is to iterate over a range of numbers, this is what you need
- Map - like native JavaScript Maps, but with additional methods and functionality and they check keys by structural equality, not by reference (any type as keys)
- Tuple - immutable, Array-like collection
- Set - Ordered collection of unique values based on structural (value) equality
- LinkedList - a doubly linked list using objects as nodes

import { curry } from "@jasonsbarr/functional-core/lib/lambda/curry.js";
import { traverse } from "./traverse.js";
import { identity } from "@jasonsbarr/functional-core/lib/helpers/identity.js";

export const sequence = curry((point, iter) => traverse(point, identity, iter));

import { curry } from "@jasonsbarr/functional-core/functions/lambda/curry.js";
import { traverse } from "./traverse.js";
import { identity } from "@jasonsbarr/functional-core/functions/helpers/identity.js";

export const sequence = curry((point, iter) => traverse(point, identity, iter));

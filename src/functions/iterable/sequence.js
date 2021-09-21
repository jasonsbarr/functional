import { curry } from "../lambda/curry.js";
import { traverse } from "./traverse.js";
import { identity } from "../helpers/identity.js";

export const sequence = curry((point, iter) => traverse(point, identity, iter));

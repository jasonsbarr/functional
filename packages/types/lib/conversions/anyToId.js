import { Id } from "@jasonsbarr/functional-core/lib/types/Id.js";

export const anyToId = (any) => Id(any.valueOf());

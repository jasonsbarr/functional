import { mapWithIndex } from "./mapWithIndex.js";
import { map } from "./map.js";
import { get } from "./get.js";

// unsafe - can return null values
// use only when you know all iters are the same length
export const zip = (...iters) =>
  mapWithIndex((_, i) => {
    return map(
      (iter) =>
        get(i, iter).fold(
          (_) => null,
          (x) => x
        ),
      iters
    );
  }, iters[0]);

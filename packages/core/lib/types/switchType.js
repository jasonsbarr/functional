import { keys } from "../object/keys.js";
import { includes } from "../array/includes.js";
import { assert } from "../helpers/assert.js";
import { not } from "../helpers/not.js";
import { curry } from "../lambda/curry.js";
/**
 *
 * @param {Object|Function} typeRepresentative The type representative object for a type
 * @param {Object} dispatcher The dispatcher with a function for every variant of a type
 * @param {Object} instance The actual instance of a type being switched on
 * @returns {Any} The result of the dispatched function
 */
export const switchType = curry((typeRepresentative, dispatcher, instance) => {
  const cases = keys(dispatcher);
  if (not(includes("_", cases))) {
    for (let variant of typeRepresentative.variants) {
      assert(
        includes(variant, cases),
        "switchType must take a case for every variant of a type"
      );
    }
    for (let typeCase of cases) {
      assert(
        includes(typeCase, typeRepresentative.variants),
        "Variant not found for switch case"
      );
    }
  }
  return dispatcher[instance.variant](instance);
});

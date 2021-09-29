import { keys } from "../object/keys.js";
import { includes } from "../array/includes.js";
import { not } from "../helpers/not.js";
import { curry } from "../lambda/curry.js";
/**
 *
 * @param {Object} typeRepresentative The type representative object for a type
 * @param {Object} dispatcher The dispatcher with a function for every variant of a type
 * @param {Object} instance The actual instance of a type being switched on
 * @returns {Any} The result of the dispatched function
 */
export const switchType = curry((typeRepresentative, dispatcher, instance) => {
  const cases = keys(dispatcher);
  for (let variant of typeRepresentative.variants) {
    if (not(includes(variant, cases))) {
      throw new Error(
        "switchType must take a case for every variant of a type"
      );
    }
  }
  for (let typeCase of cases) {
    if (not(includes(typeCase, typeRepresentative.variants))) {
      throw new Error("Variant not found for switch case");
    }
  }
  return dispatcher[instance.variant](instance);
});

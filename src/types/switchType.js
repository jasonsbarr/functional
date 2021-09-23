import { keys } from "../functions/object/keys.js";
import { includes } from "../functions/iterable/includes.js";
/**
 *
 * @param {Object} typeRepresentative The type representative object for a type
 * @param {Object} dispatcher The dispatcher with a function for every variant of a type
 * @param {Object} instance The actual instance of a type being switched on
 * @returns {Any} The result of the dispatched function
 */
export const switchType = (typeRepresentative, dispatcher, instance) => {
  const cases = keys(dispatcher);
  for (let variant of typeRepresentative.variants) {
    if (!includes(variant, cases)) {
      throw new Error(
        "switchType must take a case for every variant of a type"
      );
    }
  }
  return dispatcher[instance.variant](instance.value);
};

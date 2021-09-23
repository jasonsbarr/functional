import { assign } from "../functions/object/assign.js";
import { definePropWithOpts } from "../functions/object/definePropWithOpts.js";

/**
 * @typedef {Object} VariantInfo The info used to construct a type variant
 * @property {string} variantName The name of the variant
 * @property {Array} typeClasses An array of typeClass objects with default method implementations
 * @property {Object} overrides An object of methods that override or supplement the default methods
 */
export const VariantInfo = (variantName, typeClasses, overrides = {}) => ({
  variantName,
  typeClasses,
  overrides,
});

/**
 * Creates a variant constructor from a VariantInfo object
 *
 * The variant can hold any value, including another type variant instance
 *
 * @param {String} typeName The name of the type representative
 * @param {VariantInfo} variantInfo The information used to create the variant
 */
const createVariantConstructor = (typeName, variantInfo, overrides = {}) => {
  let variant = {
    type: typeName,
    variant: variantInfo.variantName,
    _value: undefined,
    get value() {
      return variant._value;
    },
  };

  for (let className of variantInfo.typeClasses) {
    variant = assign(variant, className);
  }

  variant = assign(variant, overrides);

  const variantConstructor = (value) => {
    definePropWithOpts("_value", variant, {
      enumerable: false,
      writable: true,
      configurable: false,
      value,
    });

    definePropWithOpts("constructor", variant, {
      enumerable: false,
      writable: false,
      configurable: false,
      value: variantConstructor,
    });

    return variant;
  };

  return variantConstructor;
};

/**
 * Creates a tagged union type with variants
 *
 * All types will be created as an object that serves as the type representative,
 * and all variants will get constructor functions as methods on that object.
 * Constructors will return an object that contains the type name, the variant name,
 * the value held "inside" the type (which can be anything, including an instance
 * of another type), and any methods defined in the variants info.
 *
 * @param {String} typeName The name of the type
 * @param {VariantInfo[]} variantInfos Info used to create variants
 * @param {Array} typeClasses An array of type classes to apply to the type representative
 * @param {Object} overrides Method overrides and additional method definitions for the type representative
 */
export const createType = (
  typeName,
  variantInfos,
  typeClasses = [],
  overrides = {}
) => {
  let typeRepresentative = {
    type: typeName,
    variants: [],
  };

  for (let info of variantInfos) {
    typeRepresentative[info.variantName] = createVariantConstructor(
      typeName,
      info
    );
    typeRepresentative.variants.push(info.variantName);
  }

  for (let className of typeClasses) {
    typeRepresentative = assign(typeRepresentative, className);
  }

  assign(typeRepresentative, overrides);

  return typeRepresentative;
};

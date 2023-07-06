import { assign } from "../object/assign.js";
import { definePropWithOpts } from "../object/definePropWithOpts.js";
import { freeze } from "../object/freeze.js";
import { length } from "../array/length.js";
import { create } from "../object/create.js";
import { isFunction } from "../predicates/isFunction.js";

/**
 * @typedef {Object} VariantInfo The info used to construct a type variant
 * @property {string} variantName The name of the variant
 * @property {Array} typeClasses An array of typeClass objects with default method implementations
 * @property {Object} overrides An object of methods that override or supplement the default methods
 * @property {Object} statics Static methods to attach to the variant constructor, often used with single-variant types
 * @property {Array} statics.sTypeClasses Array of typeclasses the constructor itself must implement
 * @property {Object} statics.methods Static methods to attach to the constructor
 */
export const VariantInfo = (
  variantName,
  fields = [],
  typeClasses = [],
  overrides = {},
  { sTypeClasses = [], methods = {} } = {}
) => ({
  variantName,
  fields,
  typeClasses,
  overrides,
  statics: { sTypeClasses, methods },
});

/**
 * Creates a variant constructor from a VariantInfo object
 *
 * The variant can hold any value, including another type variant instance
 *
 * @param {String} typeName The name of the type representative
 * @param {VariantInfo} variantInfo The information used to create the variant
 * @returns {Function} The constructed variant instance
 */
const createVariantConstructor = (
  typeName,
  {
    variantName,
    fields = [],
    typeClasses = [],
    overrides = {},
    statics: { sTypeClasses = [], methods = {} } = {},
  }
) => {
  let variantConstructor = (...args) => {
    let variant = {
      type: typeName,
      variant: variantName,
      get value() {
        return this._value;
      },
      set value(v) {
        this._value = v;
      },
      ["is" + typeName]: () => true,
      ["is" + variantName]: () => true,
      valueOf() {
        return this.value;
      },
      inspect() {
        return `${variantName}(${this.value})`;
      },
      toString() {
        return this.inspect();
      },
    };

    for (let className of typeClasses) {
      variant = assign(variant, className);
    }

    variant = assign(variant, overrides);

    if (length(fields) === 0) {
      definePropWithOpts("_value", variant, {
        enumerable: false,
        writable: true,
        configurable: false,
        // if no fields and multiple args, treat args array as tuple
        value: args.length === 1 ? args[0] : args,
      });
    } else {
      let obj = create({});
      let i = 0;

      for (let field of fields) {
        obj[field] = args[i];
        i++;
      }

      definePropWithOpts("_value", variant, {
        enumerable: false,
        writable: true,
        configurable: false,
        value: obj,
      });
    }

    definePropWithOpts("constructor", variant, {
      enumerable: false,
      writable: false,
      configurable: false,
      value: variantConstructor,
    });

    if (variant.init && isFunction(variant.init)) {
      definePropWithOpts("init", variant, {
        enumerable: false,
        writable: false,
        configurable: false,
        value: variant.init,
      });
      variant.init();
    }

    freeze(variant);

    return variant;
  };

  // assign statics to constructor
  for (let className of sTypeClasses) {
    variantConstructor = assign(variantConstructor, className);
  }

  variantConstructor = assign(variantConstructor, methods);

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
 * @param {Object} methods Method overrides and additional method definitions for the type representative
 * @returns {Type} The created type representative object
 */
export const createType = (
  typeName,
  variantInfos,
  typeClasses = [],
  methods = {}
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
    typeRepresentative["is" + info.variantName] = (x) =>
      x && x.variant === info.variantName;
    typeRepresentative.variants.push(info.variantName);
  }

  for (let className of typeClasses) {
    typeRepresentative = assign(typeRepresentative, className);
  }

  assign(typeRepresentative, methods);

  typeRepresentative["is" + typeName] = (x) => x && x.type === typeName;

  return typeRepresentative;
};

export const extendType = (
  typeRepresentative,
  variantInfos,
  typeClasses = [],
  methods = {}
) => {
  const typeName = typeRepresentative.type;
  const oldVariants = [...typeRepresentative.variants];
  const extension = createType(typeName, variantInfos, typeClasses, methods);

  let extended = assign({}, typeRepresentative, extension);
  extended.variants = oldVariants.concat(extended.variants);

  return extended;
};

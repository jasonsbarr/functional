import {
  VariantInfo,
  createType,
} from "@jasonsbarr/functional-core/lib/types/createType.js";
import {
  Applicative,
  Apply,
  Chain,
  RightFold,
  Functor,
  Monoid,
  RightAlt,
  RightBifunctor,
  SemiGroup,
  Setoid,
  Swap,
  LeftAlt,
  LeftApply,
  LeftBifunctor,
  LeftChain,
  LeftFold,
  LeftFunctor,
  LeftSemiGroup,
} from "@jasonsbarr/functional-core/lib/types/typeClasses.js";
import { isArray } from "@jasonsbarr/functional-core/lib/predicates/isArray.js";
import { assert } from "@jasonsbarr/functional-core/lib/helpers/assert.js";

const variantInfos = [
  VariantInfo(
    "Success",
    [
      Apply,
      Chain,
      RightFold,
      RightAlt,
      Functor,
      RightBifunctor,
      SemiGroup,
      Setoid,
      Swap,
    ],
    {
      // Functor
      map(f) {
        return Validation.of(f(this.value.value));
      },
      // Chain
      chain(f) {
        return f(this.value.value);
      },
      // Bifunctor
      bimap(f, g) {
        return Validation.of(g(this.value.value));
      },
      // Swap
      swap(failMessage) {
        return Validation.fail(this.value.value, failMessage);
      },

      // (Right)SemiGroup
      concat(validation) {
        assert(
          Validation.isValidation(validation),
          "Argument to validation.concat must be another Validation type"
        );
        return validation;
      },

      fold(f, g) {
        return g(this.value.value);
      },
    }
  ),
  VariantInfo(
    "Failure",
    [
      LeftAlt,
      LeftApply,
      LeftBifunctor,
      LeftChain,
      LeftFold,
      LeftFunctor,
      LeftSemiGroup,
      Setoid,
      Swap,
    ],
    {
      init() {
        const { value, messages } = this.value;
        assert(
          value && messages,
          "Validation.Failure constructor takes an object with value and message fields"
        );
        // value is the field value
        this.value.value = value;
        // messages aggregates error messages
        this.value.messages = isArray(messages) ? messages : [messages];
      },

      mapFailure(fn) {
        const { value, messages } = this.value;
        const failures = messages.map(fn);
        return Validation.fail(value, failures);
      },

      // Swap
      swap(failMessage) {
        return Validation.of(this.value.value);
      },

      // (Left)Fold
      fold(f, g) {
        return f(this.value);
      },

      // (Left)SemiGroup
      concat(validation) {
        assert(
          Validation.isValidation(validation),
          "Argument to validation.concat must be another Validation type"
        );
        if (validation.isFailure && validation.isFailure()) {
          const { value, messages } = this.value;
          return Validation.fail(
            value,
            messages.concat(validation.value.messages)
          );
        }
        return this;
      },

      // (Left)Bifunctor
      bimap(failFn, successFn) {
        const { value, messages } = this.value;
        const failures = messages.map(failFn);
        return Validation.fail(value, failures);
      },
    }
  ),
];

const representativeMethods = {
  fail(value, message) {
    return Validation.Failure({
      value,
      messages: isArray(message) ? message : [message],
    });
  },

  succeed(value) {
    return Validation.Success(value);
  },

  of(value) {
    return Validation.Success(value);
  },

  empty() {
    return Validation.of("");
  },
};

export const Validation = createType(
  "Validation",
  variantInfos,
  [Applicative, Monoid],
  representativeMethods
);

export const { succeed, fail, Success, Failure } = Validation;

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
      // Swap
      swap(failMessage) {
        return Validation.fail(this.value, failMessage);
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
        return g(this);
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
        // this.value is the field value
        this.value = value;
        // this.messages aggregates error messages
        this.messages = isArray(messages) ? messages : [messages];
      },

      mapFailure(fn) {
        const failures = this.messages.map(fn);
        return Validation.fail(this.value, failures);
      },

      // Swap
      swap(failMessage) {
        return Validation.of(this.value);
      },

      // (Left)Fold
      fold(f, g) {
        return f(this);
      },

      // (Left)SemiGroup
      concat(validation) {
        assert(
          Validation.isValidation(validation),
          "Argument to validation.concat must be another Validation type"
        );
        if (validation.isFailure()) {
          return Validation.fail(
            this.value,
            this.messages.concat(validation.messages)
          );
        }
        return this;
      },

      // (Left)Bifunctor
      bimap(failFn, successFn) {
        const failures = this.messages.map(failFn);
        return Validation.fail(this.value, failures);
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

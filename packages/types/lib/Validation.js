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
  Plus,
} from "@jasonsbarr/functional-core/lib/types/typeClasses.js";
import { isArray } from "@jasonsbarr/functional-core/lib/predicates/isArray.js";
import { assert } from "@jasonsbarr/functional-core/lib/helpers/assert.js";

const variantInfos = [
  VariantInfo(
    "Success",
    [],
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
        return Validation.of(f(this.value));
      },
      // Chain
      chain(f) {
        return f(this.value);
      },
      // Bifunctor
      bimap(f, g) {
        return Validation.of(g(this.value));
      },
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
        return g(this.value);
      },
    }
  ),
  VariantInfo(
    "Failure",
    ["value", "messages"],
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
      mapFailure(fn) {
        const { value, messages } = this.value;
        const failures = messages.map(fn);
        return Validation.fail(value, failures);
      },

      // Swap
      swap(failMessage) {
        const { value } = this.value;
        return Validation.of(value);
      },

      // (Left)Fold
      fold(f, g) {
        const { value, messages } = this.value;
        return f(value, messages);
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
    return Validation.Failure(value, isArray(message) ? message : [message]);
  },

  succeed(value) {
    return Validation.Success(value);
  },

  zero() {
    return Validation.Failure();
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
  [Applicative, Monoid, Plus],
  representativeMethods
);

export const { succeed, fail, Success, Failure } = Validation;

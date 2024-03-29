import {
  VariantInfo,
  createType,
} from "@jasonsbarr/functional-core/lib/types/createType.js";
import { switchType } from "@jasonsbarr/functional-core";
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
  Ord,
} from "@jasonsbarr/functional-core/lib/types/typeClasses.js";
import { isArray } from "@jasonsbarr/functional-core/lib/predicates/isArray.js";
import { lt } from "@jasonsbarr/functional-core";
import { equals } from "@jasonsbarr/functional-core";

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
      Ord,
      Swap,
    ],
    {
      // Functor
      map(f) {
        return Validation.of(f(this.value));
      },
      mapFailure(fn) {
        return this;
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
      Ord,
      Swap,
    ],
    {
      init() {
        const { value, messages } = this.value;
        // this.value is the field value
        this.value = value;
        // this.messages aggregates error messages
        this.messages = isArray(messages) ? messages : [messages];
      },
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
        if (validation.isFailure()) {
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

      // Setoid
      equals(other) {
        const { value } = this.value;
        const { value: oValue } = other.value;
        return (
          equals(other.type, "Validation") &&
          equals(other.variant, "Failure") &&
          equals(value, oValue)
        );
      },

      // Ord
      lte(other) {
        const { value } = this.value;
        const { value: oValue } = other.value;
        return (
          this.equals(other) ||
          (equals(other.type, "Validation") &&
            equals(other.variant, "Failure") &&
            lt(value, oValue))
        );
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

export const extractValidationValue = (failFn, succeedFn, validation) =>
  switchType(
    Validation,
    {
      Failure: failFn,
      Success: succeedFn,
    },
    validation
  );

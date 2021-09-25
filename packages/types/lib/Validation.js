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
  RightBifunctor,
  SemiGroup,
  Setoid,
  Swap,
  LeftApply,
  LeftBifunctor,
  LeftChain,
  LeftFold,
  LeftFunctor,
  LeftSemiGroup,
} from "@jasonsbarr/functional-core/lib/types/typeClasses.js";
import { isArray } from "@jasonsbarr/functional-core/lib/predicates/isArray.js";

const variantInfos = [
  VariantInfo(
    "Success",
    [Apply, Chain, RightFold, Functor, RightBifunctor, SemiGroup, Setoid, Swap],
    {
      // Swap
      swap(failMessage) {
        return Validation.Failure({
          value: this.value,
          messages: [failMessage],
        });
      },
    }
  ),
  VariantInfo(
    "Failure",
    [
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
        const { value, message } = this.value;
        if (!value || !message) {
          throw new Error(
            "Validation.Failure constructor takes an object with value and message fields"
          );
        }
        // this.value is the field value
        this.value = value;
        // this.messages aggregates error messages
        this.messages = isArray(message) ? message : [message];
      },

      mapFailure(fn) {
        const failures = this.messages.map(fn);
        return Validation.Failure({ value: this.value, messages: failures });
      },

      // Swap
      swap(failMessage) {
        return Validation.Success(this.value);
      },
    }
  ),
];

const constructorMethods = {
  fail(value, message) {
    return Validation.Failure({
      value,
      messages: isArray(message) ? message : [message],
    });
  },

  of(value) {
    return Validation.Success(value);
  },

  empty() {
    return Validation.Success("");
  },
};

export const Validation = createType(
  "Validation",
  variantInfos,
  [Applicative, Monoid],
  constructorMethods
);

import {
  VariantInfo,
  createType,
} from "@jasonsbarr/functional-core/lib/types/createType.js";

import {
  Apply,
  Chain,
  RightFold,
  Functor,
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

const variantInfos = [
  VariantInfo(
    "Success",
    [Apply, Chain, RightFold, Functor, RightBifunctor, SemiGroup, Setoid, Swap],
    {}
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
    {}
  ),
];

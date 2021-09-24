import { curry } from "../lambda/curry.js";
import { setProto } from "./setProto.js";

export const copyProto = curry((source, target) =>
  setProto(source.__proto__, target)
);

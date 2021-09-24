import { getProto } from "../object/getProto.js";

export const hasNullProto = (obj) => getProto(obj) === null;

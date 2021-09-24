import { Result } from "../../types/Result.js";

export const bigint = (str) => Result.of(BigInt(str));

import { Option } from "../../types/Option.js";

// returns Option
export const median = (iter) => {
  const temp = [...iter];
  const mid = Math.floor(temp.length / 2);
  temp.sort((a, b) => a - b);
  return Option.of(
    temp.length % 2 === 0 ? (temp[mid - 1] + temp[mid]) / 2 : temp[mid]
  );
};

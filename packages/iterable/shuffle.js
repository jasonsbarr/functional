import { length } from "./length.js";
import { floor } from "../math/floor.js";
import { random } from "../math/random.js";

// Fisher-Yates shuffle algorithm, from https://stackoverflow.com/a/2450976
export const shuffle = (iter) => {
  let temp = [...iter];
  let currentIndex = length(iter),
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = floor(random() * currentIndex);
    currentIndex--;
    [temp[currentIndex], temp[randomIndex]] = [
      temp[randomIndex],
      temp[currentIndex],
    ];
  }
  return iter.constructor(...temp);
};

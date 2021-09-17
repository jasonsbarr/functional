import { compact } from "./compact.js";
import { length } from "./length.js";

export function slice(iter, start, end, step) {
  const args = compact([...arguments]).slice(1);
  let result = [];
  if (args.length === 0) {
    return iter.constructor(...iter);
  }
  if (args.length === 1) {
    end = args[0];
    start = 0;
  }
  step = step || 1;
  if (start < 0) start = length(iter) + start;
  if (end < 0) end = length(iter) + end;
  if (end > length(iter) - 1) end = length(iter) - 1;
  if (end < start) throw new Error("Start of slice must come before end");
  const tempStep = step > 0 ? step : -step;
  const temp = [...iter];

  for (let i = start; i < end; i += tempStep) {
    result.push(temp[i]);
  }

  if (step < 0) result.reverse();

  return iter.constructor(...result);
}

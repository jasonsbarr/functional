import { Task } from "../types/Task.js";

export const resultToTask = (result) => result.fold(Task.rejected, Task.of);

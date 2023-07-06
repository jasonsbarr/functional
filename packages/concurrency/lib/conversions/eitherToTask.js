import { Task } from "../types/Task.js";

export const eitherToTask = (either) => either.fold(Task.rejected, Task.of);

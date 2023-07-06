import { Task } from "../types/Task.js";

export const optionToTask = (option) => option.fold(Task.rejected, Task.of);

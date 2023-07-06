import { Task } from "../types/Task.js";

export const idToTask = (identity) => identity.fold(Task.of);

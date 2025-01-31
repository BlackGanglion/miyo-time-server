import { Goal } from "../entities/goals.entity";
import { KeyResult } from "../entities/key-results.entity";
import { Task } from "../entities/tasks.entity";

export interface TaskType extends Task {
  keyResult: KeyResult | null;
  goal: Goal | null;
}
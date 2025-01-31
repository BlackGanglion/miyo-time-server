import { Record } from "../entities/records.entity";
import { TaskType } from "../tasks/type";

export interface RecordType extends Record {
  task: TaskType | null;
}
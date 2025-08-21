export interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: string ;
  createAt?: string;
  isCompleted?:boolean,
  priority: "high"| "medium"| "low";
}

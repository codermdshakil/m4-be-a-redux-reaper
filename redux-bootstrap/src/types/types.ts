export interface ITask {
  id: string;
  title: string;
  description: string;
  deuDate: string;
  createAt: string;
  isCompleted:boolean,
  priority: "high"| "medium"| "low";
}

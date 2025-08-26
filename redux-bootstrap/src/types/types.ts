export interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: string ;
  createAt?: string;
  isCompleted?:boolean,
  priority: "all"|"high"| "medium"| "low";
  assignedTo:string | null;
}

export interface IUser{
  id:string,
  name:string;
}
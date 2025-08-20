import { AddTaskModal } from "@/components/modules/tasks/AddTaskModal";
import TaskCard from "@/components/modules/tasks/TaskCard";
import { selectorTasks } from "@/redux/features/task/taskSlice";
import { useAppSelector } from "@/redux/hooks";
import type { ITask } from "@/types/types";

const Tasks = () => {
  // const tasks = useAppSelector((state) => state.todo.tasks);
  const tasks = useAppSelector(selectorTasks);

  console.log(tasks, "tasks");

  return (
    <div>
      <div className="flex justify-between items-center my-3">
        <div>
          <h1 className="mb-4 text-2xl">Tasks</h1>
        </div>
        <div>
          <AddTaskModal />
        </div>
      </div>
      {tasks.map((task: ITask) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Tasks;

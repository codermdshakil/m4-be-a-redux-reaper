import { AddTaskModal } from "@/components/modules/tasks/AddTaskModal";
import TaskCard from "@/components/modules/tasks/TaskCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sortTasks } from "@/lib/utils";
import { selectorTasks, taskFilter } from "@/redux/features/task/taskSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { ITask } from "@/types/types";

const Tasks = () => {
  // const tasks = useAppSelector((state) => state.todo.tasks);
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectorTasks);

  const sortedTasks = sortTasks(tasks);


  return (
    <div>
      <div className="flex justify-end items-center my-3">
        <div>
          <h1 className="mb-4 text-2xl">Tasks</h1>
        </div>
        <div className="ml-auto mr-5">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger onClick={() => dispatch(taskFilter("all"))} value="all">All</TabsTrigger>
              <TabsTrigger onClick={() => dispatch(taskFilter("high"))} value="high">High</TabsTrigger>
              <TabsTrigger onClick={() => dispatch(taskFilter("medium"))} value="medium">Medium</TabsTrigger>
              <TabsTrigger onClick={() => dispatch(taskFilter("low"))} value="low">Low</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div>
          <AddTaskModal />
        </div>
      </div>
      {sortedTasks.map((task: ITask) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default Tasks;

import { AddTaskModal } from "@/components/modules/tasks/AddTaskModal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Tasks = () => {
  

  return (
    <div>
      <div className="flex justify-end items-center my-3">
        <div>
          <h1 className="mb-4 text-2xl">Tasks</h1>
        </div>
        <div className="ml-auto mr-5">
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="high">High</TabsTrigger>
              <TabsTrigger value="medium">Medium</TabsTrigger>
              <TabsTrigger value="low">Low</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div>
          <AddTaskModal />
        </div>
      </div>
      {/* {sortedTasks.map((task: ITask) => (
        <TaskCard key={task.id} task={task} />
      ))} */}
    </div>
  );
};

export default Tasks;

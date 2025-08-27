import { AddTaskModal } from "@/components/modules/tasks/AddTaskModal";
import TaskCard from "@/components/modules/tasks/TaskCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetTasksQuery } from "@/redux/api/baseAPI";

const Tasks = () => {
  const { data, isLoading, isError } = useGetTasksQuery(undefined);
  console.log(data, isLoading, isError, "test");

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
      {isLoading && <h3>Loading...</h3>}
      {!isLoading &&
        data.tasks.map((task: any) => <TaskCard key={task._id} task={task} />)}
    </div>
  );
};

export default Tasks;

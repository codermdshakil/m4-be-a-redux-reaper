import type { RootState } from "@/redux/store";
import type { ITask } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  tasks: ITask[],
  filter: "all" | "high" | "medium" |"low"
}

const initialState : InitialState = {
  tasks: [
    {
      id: "1",
      title: "Initialaize fontend",
      description: "Create home page and routing",
      deuDate: "25-11",
      createAt: "25-01",
      isCompleted:false,
      priority: "high",
    },
    {
      id: "2",
      title: "Create Github Repo",
      description: "Create a github repo and connected with the project",
      deuDate: "25-11",
      createAt: "25-01",
      isCompleted:false,
      priority: "medium",
    },
    {
      id: "3",
      title: "Connected with Redux",
      description: "connected with redux toolkit",
      deuDate: "25-11",
      createAt: "25-01",
      isCompleted:false,
      priority: "low",
    },
  ],
  filter:"all",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
});


// export selectors of tasks

export const  selectorTasks = (state:RootState) => {
  return state.todo.tasks;
}

export const  selectorFilter = (state:RootState) => {
  return state.todo.filter;
}

export default taskSlice.reducer;

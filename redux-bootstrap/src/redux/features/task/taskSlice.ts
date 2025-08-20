import type { ITask } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  task: ITask[]
}

const initialState : InitialState = {
  task: [
    {
      id: "asd12",
      title: "Initialaize fontend",
      description: "Create home page and routing",
      deuDate: "25-11",
      createAt: "25-01",
      isCompleted:false,
      priority: "High",
    },
    {
      id: "asd12",
      title: "Create a github repo and connected with the project",
      description: "Create home page and routing",
      deuDate: "25-11",
      createAt: "25-01",
      isCompleted:false,
      priority: "High",
    },
  ],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export default taskSlice.reducer;

import type { RootState } from "@/redux/store";
import type { ITask } from "@/types/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  tasks: ITask[];
  filter: "all" | "high" | "medium" | "low";
}

const initialState: InitialState = {
  tasks: [],
  filter: "all",
};

type DraftData = Pick<ITask, "title" | "description" |"priority" |"dueDate">;


// create task data 
const createTask = (taskData:DraftData): ITask => {
  return {
    id: nanoid(),
    isCompleted:false,
    ...taskData
  }
};


const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {

    // create task
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.push(createTask(action.payload));
    },
    removeTask: (state, action) => {
      const id = action.payload;
      console.log(id, "payload");

      // filter returns a new array
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
  },
});

// export selectors of tasks

export const selectorTasks = (state: RootState) => {
  return state.todo.tasks;
};

export const selectorFilter = (state: RootState) => {
  return state.todo.filter;
};

export const { addTask, removeTask } = taskSlice.actions;

export default taskSlice.reducer;

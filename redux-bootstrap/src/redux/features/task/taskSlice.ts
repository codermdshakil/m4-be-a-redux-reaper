import { generateSecureId } from "@/lib/utils";
import type { RootState } from "@/redux/store";
import type { ITask } from "@/types/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  tasks: ITask[];
  filter: "all" | "high" | "medium" | "low";
}

const initialState: InitialState = {
  tasks: [],
  filter: "all",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      // generate id
      const id = generateSecureId(12);

      const taskData: ITask = {
        ...action.payload,
        id,
        isCompleted: false,
      };
      state.tasks.push(taskData);
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

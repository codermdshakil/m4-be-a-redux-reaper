import type { RootState } from "@/redux/store";
import type { ITask } from "@/types/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  tasks: ITask[];
  filter: "all" | "high" | "medium" | "low";
}

const initialState: InitialState = {
  tasks: [
    {
      id: "1",
      title: "Finish React Project",
      description:
        "Complete the UI for the dashboard and integrate Redux store.",
      dueDate: "2025-08-25T00:00:00.000Z", // ISO string
      createAt: "2025-08-20T12:00:00.000Z",
      isCompleted: false,
      priority: "low",
    },
    {
      id: "2",
      title: "Read Database Chapter",
      description: "Go through MySQL joins and practice 10 queries.",
      dueDate: "2025-08-28T00:00:00.000Z",
      createAt: "2025-08-21T10:30:00.000Z",
      isCompleted: false,
      priority: "medium",
    },
    {
      id: "3",
      title: "Buy Groceries",
      description: "Milk, eggs, bread, and some fruits.",
      dueDate: "2025-08-22T00:00:00.000Z",
      createAt: "2025-08-21T08:15:00.000Z",
      isCompleted: false,
      priority: "high",
    },
  ],
  filter: "all",
};

type DraftData = Pick<ITask, "title" | "description" | "priority" | "dueDate">;

// create task data
const createTask = (taskData: DraftData): ITask => {
  return {
    id: nanoid(),
    isCompleted: false,
    ...taskData,
  };
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
    toggleCompleteState: (state, action: PayloadAction<string>) => {
      state.tasks.forEach((task) =>
        task.id === action.payload
          ? (task.isCompleted = !task.isCompleted)
          : task
      );
    },
    updateTask: (state, action: PayloadAction<ITask>) => {
      console.log(action.payload, "payload");
      const updatedTask = action.payload;

      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);

      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index], // keep old values
          ...updatedTask, // overwrite with new values
        };
      }
    },
    taskFilter: (
      state,
      action: PayloadAction<"all" | "low" | "medium" | "high">
    ) => {
      state.filter = action.payload;
    },
  },
});

// export selectors of tasks

export const selectorTasks = (state: RootState) => {

  const filter = state.todo.filter;

  if(filter === 'low'){
    return state.todo.tasks.filter((task) => task.priority === "low");
  }else if(filter === 'medium'){
    return state.todo.tasks.filter((task) => task.priority === "medium");
  }else if(filter === 'high'){
    return state.todo.tasks.filter((task) => task.priority === "high");
  }
  else{
     return state.todo.tasks;
  }

};

export const selectorFilter = (state: RootState) => {
  return state.todo.filter;
};

export const {
  addTask,
  removeTask,
  toggleCompleteState,
  updateTask,
  taskFilter,
} = taskSlice.actions;

export default taskSlice.reducer;

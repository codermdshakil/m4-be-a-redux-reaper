import type { RootState } from "@/redux/store";
import type { IUser } from "@/types/types";
import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  users: IUser[];
}

const initialState: InitialState = {
  users: [
    {
      id:'1',
      name:"Shakil Ahmed"
    },
    {
      id:'2',
      name:"Noyon Rahman"
    },
    {
      id:'3',
      name:"Nadim Hassan"
    }
  ],
};

// create user data
const createUser = (userName: string): IUser => {
  return {
    id: nanoid(),
    name: userName,
  };
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<string>) => {
      state.users.push(createUser(action.payload));
    },
    removeUser: (state, action) => {
      const id = action.payload;

      // filter returns a new array
      state.users = state.users.filter((user) => user.id !== id);
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export const selectorUsers = (state: RootState) => {
  return state.users;
};

export default userSlice.reducer;

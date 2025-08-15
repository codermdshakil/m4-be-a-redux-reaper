import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  count:0
}


const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {

    increment: (state) => {
      state.count += 1
    },
    incrementWithFive: (state, action) => {
      console.log(action, 'action');
      state.count = state.count + action.payload;
    },
    decrement: (state) => {
      state.count -= 1
    },


  },
});

export const  {increment, decrement, incrementWithFive} = counterSlice.actions;

export default counterSlice.reducer;



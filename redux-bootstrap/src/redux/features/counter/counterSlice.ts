import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  count:0
}


const counterSlice = createSlice({
  name:"Counter",
  initialState,
  reducers:{
    increment:(state) => {
      state.count += 1;
    },
    incrementByFive:(state, action) => {
      state.count = state.count + action.payload;
    },
    decrement:(state) => {
      state.count -= 1;
    }
  }
});


export const {increment,incrementByFive, decrement} = counterSlice.actions;


export default counterSlice.reducer;

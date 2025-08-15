import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: () => {
      initialState.count += 1;
    },
    decrement: () => {
      initialState.count += 1;
    },
  },
});

// export { increment, decrement } from counterSlice.actions;

export default counterSlice.reducer;



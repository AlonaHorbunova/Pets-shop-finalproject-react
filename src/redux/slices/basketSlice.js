import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
  },
  reducers: {},
});

export const { addItem, removeItem } = basketSlice.actions;
export default basketSlice.reducer;

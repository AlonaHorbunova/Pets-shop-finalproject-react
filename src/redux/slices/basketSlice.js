import { createSlice } from "@reduxjs/toolkit";

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
  },
  reducers: {
    // Здесь вы будете добавлять функции для корзины, например:
    // addItem: (state, action) => { ... },
    // removeItem: (state, action) => { ... },
  },
});

export const { addItem, removeItem } = basketSlice.actions;
export default basketSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронный "санк" для получения всех товаров
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3333/products/all");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Асинхронный "санк" для получения ОДНОГО товара по ID
export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:3333/products/${productId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selectedItem: null,
    status: "idle", // <-- Статус для всех товаров
    error: null,
    singleItemStatus: "idle", // <-- НОВЫЙ СТАТУС ДЛЯ ОДНОГО ТОВАРА
    singleItemError: null, // <-- НОВАЯ ПЕРЕМЕННАЯ ДЛЯ ОШИБКИ
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обработка получения всех товаров
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Обработка получения ОДНОГО товара
      .addCase(fetchSingleProduct.pending, (state) => {
        state.singleItemStatus = "loading"; // <-- Используем новый статус
        state.selectedItem = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleItemStatus = "succeeded"; // <-- Используем новый статус
        if (action.payload && action.payload.length > 0) {
          state.selectedItem = action.payload[0];
        } else {
          state.selectedItem = null;
        }
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.singleItemStatus = "failed"; // <-- Используем новый статус
        state.singleItemError = action.payload;
      });
  },
});

export default productsSlice.reducer;

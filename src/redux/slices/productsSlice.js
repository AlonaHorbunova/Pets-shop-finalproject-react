import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
    status: "idle",
    error: null,
    singleItemStatus: "idle",
    singleItemError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

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

      .addCase(fetchSingleProduct.pending, (state) => {
        state.singleItemStatus = "loading";
        state.selectedItem = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleItemStatus = "succeeded";
        if (action.payload && action.payload.length > 0) {
          state.selectedItem = action.payload[0];
        } else {
          state.selectedItem = null;
        }
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.singleItemStatus = "failed";
        state.singleItemError = action.payload;
      });
  },
});

export default productsSlice.reducer;

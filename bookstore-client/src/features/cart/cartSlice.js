import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Get cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/carts");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch cart"
      );
    }
  }
);

// Add to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ bookId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.post("/carts", {
        bookId,
        quantity,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to add to cart"
      );
    }
  }
);

// Update cart item
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ bookId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/carts/${bookId}`, {
        quantity,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to update cart"
      );
    }
  }
);

// Delete cart item
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/carts/${bookId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to remove item"
      );
    }
  }
);

const initialState = {
  cart: null,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    clearCartError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH CART
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;

        state.cart =
          action.payload.data?.cart || action.payload.data || null;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD TO CART
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;

        state.cart =
          action.payload.data?.cart || action.payload.data || state.cart;
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE CART
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;

        state.cart =
          action.payload.data?.cart || action.payload.data || state.cart;
      })

      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REMOVE ITEM
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
      })

      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;

        state.cart =
          action.payload.data?.cart || action.payload.data || state.cart;
      })

      .addCase(removeCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCartError } = cartSlice.actions;

export default cartSlice.reducer;
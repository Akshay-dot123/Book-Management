import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Get all books
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get("/books", {
        params,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch books"
      );
    }
  }
);

// Get single book
export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/books/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to fetch book"
      );
    }
  }
);

const initialState = {
  books: [],
  selectedBook: null,
  loading: false,
  error: null,
};

const bookSlice = createSlice({
  name: "books",

  initialState,

  reducers: {
    clearSelectedBook: (state) => {
      state.selectedBook = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH BOOKS
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;

        const response = action.payload;

        /*
          Your backend response is:
          {
            success,
            message,
            data
          }

          Depending on your service response,
          books can be inside data.books or data.
        */

        if (Array.isArray(response.data)) {
          state.books = response.data;
        } else if (Array.isArray(response.data?.books)) {
          state.books = response.data.books;
        } else if (Array.isArray(response.data?.result)) {
          state.books = response.data.result;
        } else {
          state.books = [];
        }
      })

      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH SINGLE BOOK
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedBook = null;
      })

      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedBook =
          action.payload.data?.book || action.payload.data;
      })

      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedBook } = bookSlice.actions;

export default bookSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define the price state interface
interface PriceState {
  prices: { symbol: string; price: string | null }[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

// Initial state
const initialState: PriceState = {
  prices: [],
  isLoading: false,
  error: null,
  lastUpdated: null,
};

// Async thunk for fetching price data
export const fetchPrice = createAsyncThunk(
  'price/fetchPrice',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/price');
      const data = await res.json();
      return data.prices; // ← ต้องคืน array เช่น [{symbol: 'btcusdt', price: '1234'}]
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  }
);


// Create the price slice
export const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    // Manual price update action
    setPrice: (state, action: PayloadAction<{ symbol: string; price: string | null }[]>) => {
      state.prices = action.payload;
      state.lastUpdated = Date.now();
      state.error = null;
    },
    // Clear error action
    clearError: (state) => {
      state.error = null;
    },
    // Reset price state
    resetPrice: (state) => {
      state.prices = [];
      state.isLoading = false;
      state.error = null;
      state.lastUpdated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prices = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchPrice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setPrice, clearError, resetPrice } = priceSlice.actions;
export default priceSlice.reducer;

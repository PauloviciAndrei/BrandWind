import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import transactionsAPI from './util/transactionsAPI';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async ({ startDate, endDate, status } = {}, { rejectWithValue }) => {
    try {
      const response = await transactionsAPI.getAllTransactions({
        startDate,
        endDate,
        status,
      });

      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionsSlice.reducer;

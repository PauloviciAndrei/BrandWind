import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/API/api';
const DEMO = import.meta.env.VITE_DEMO_MODE === 'true';

export const fetchSalesCountChartData = createAsyncThunk(
  'charts/fetchSalesCountChartData',
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      if (DEMO) {
        return [
          { month: 1, store: 'Electronics', salesCount: 120 },
          { month: 1, store: 'Clothing', salesCount: 80 },
          { month: 1, store: 'Home', salesCount: 45 },

          { month: 2, store: 'Electronics', salesCount: 150 },
          { month: 2, store: 'Clothing', salesCount: 110 },
          { month: 2, store: 'Home', salesCount: 70 },

          { month: 3, store: 'Electronics', salesCount: 180 },
          { month: 3, store: 'Clothing', salesCount: 130 },
          { month: 3, store: 'Home', salesCount: 90 },
        ];
      }

      const response = await API.get('/sales/chart-data-count', {
        params: { startDate, endDate },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchSalesByCategory = createAsyncThunk(
  'charts/fetchSalesByCategory',
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      if (DEMO) {
        return [
          { category: 'Electronics', count: 120 },
          { category: 'Clothing', count: 95 },
          { category: 'Home', count: 60 },
          { category: 'Books', count: 45 },
          { category: 'Toys', count: 30 },
        ];
      }

      const response = await API.get('/sales/sales-by-category', {
        params: { startDate, endDate },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchSalesByCountry = createAsyncThunk(
  'charts/fetchSalesByCountry',
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      if (DEMO) {
        return [
          { country: 'USA', count: 120 },
          { country: 'Germany', count: 90 },
          { country: 'Brazil', count: 60 },
          { country: 'UK', count: 45 },
          { country: 'India', count: 30 },
          { country: 'Canada', count: 25 },
        ];
      }

      const response = await API.get('/sales/sales-by-country', {
        params: { startDate, endDate },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const chartsSlice = createSlice({
  name: 'charts',
  initialState: {
    salesByCategory: [],
    salesByCountry: [],
    salesCountChartData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Sales by category
      .addCase(fetchSalesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.salesByCategory = action.payload;
      })
      .addCase(fetchSalesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Sales by country
      .addCase(fetchSalesByCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesByCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.salesByCountry = action.payload;
      })
      .addCase(fetchSalesByCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Sales count by store
      .addCase(fetchSalesCountChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesCountChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.salesCountChartData = action.payload;
      })
      .addCase(fetchSalesCountChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chartsSlice.reducer;

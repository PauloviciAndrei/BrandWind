import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/API/api';
const DEMO = import.meta.env.VITE_DEMO_MODE;

export const fetchTotalUsers = createAsyncThunk(
  'dashboard/fetchTotalUsers',
  async (_, { rejectWithValue }) => {
    try {
      if (DEMO === 'true') {
        return 9230;
      }

      const response = await API.get('/sites');
      const sites = response.data;

      const totalUsers = sites.reduce(
        (sum, site) => sum + (site.users?.length || 0),
        0
      );

      return totalUsers;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchTotalSales = createAsyncThunk(
  'dashboard/fetchTotalSales',
  async ({ startDate, endDate } = {}, { rejectWithValue }) => {
    try {
      if (DEMO === 'true') {
        return 45200;
      }
      const params = {};
      if (startDate) params.startDate = new Date(startDate).toISOString();
      if (endDate) params.endDate = new Date(endDate).toISOString();

      const response = await API.get('/sales/total', { params });
      return response.data.total;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchPendingLeads = createAsyncThunk(
  'dashboard/fetchPendingLeads',
  async (_, { rejectWithValue }) => {
    try {
      if (DEMO === 'true') {
        return 78;
      }
      const response = await API.get('/leads/pending');
      return response.data.count;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchActiveUsers = createAsyncThunk(
  'dashboard/fetchActiveUsers',
  async (_, { rejectWithValue }) => {
    try {
      if (DEMO === 'true') {
        return 5670;
      }
      const response = await API.get('/sites/active-users');
      return response.data.activeUsers || 0;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchActiveUsersRange = createAsyncThunk(
  'dashboard/fetchActiveUsersRange',
  async ({ startDate, endDate } = {}, { rejectWithValue }) => {
    try {
      if (DEMO === 'true') {
        return [
          { month: 'Jan', activeUsers: 1200 },
          { month: 'Feb', activeUsers: 1350 },
          { month: 'Mar', activeUsers: 1600 },
          { month: 'Apr', activeUsers: 1500 },
          { month: 'May', activeUsers: 1700 },
          { month: 'Jun', activeUsers: 1800 },
          { month: 'Jul', activeUsers: 1750 },
          { month: 'Aug', activeUsers: 1900 },
          { month: 'Sep', activeUsers: 2100 },
          { month: 'Oct', activeUsers: 1950 },
          { month: 'Nov', activeUsers: 2050 },
          { month: 'Dec', activeUsers: 2200 },
        ];
      }

      const params = {};
      if (startDate) params.startDate = new Date(startDate).toISOString();
      if (endDate) params.endDate = new Date(endDate).toISOString();

      const response = await API.get('/sites/active-users-range', { params });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchSalesChartData = createAsyncThunk(
  'dashboard/fetchSalesChartData',
  async ({ startDate, endDate } = {}, { rejectWithValue }) => {
    try {
      if (DEMO === 'true') {
        return [
          { month: 1, store: 'Amazon', totalAmount: 12000 },
          { month: 1, store: 'eBay', totalAmount: 8000 },
          { month: 1, store: 'Walmart', totalAmount: 9500 },

          { month: 2, store: 'Amazon', totalAmount: 13500 },
          { month: 2, store: 'eBay', totalAmount: 7700 },
          { month: 2, store: 'Walmart', totalAmount: 10200 },

          { month: 3, store: 'Amazon', totalAmount: 14000 },
          { month: 3, store: 'eBay', totalAmount: 9000 },
          { month: 3, store: 'Walmart', totalAmount: 11000 },

          { month: 4, store: 'Amazon', totalAmount: 16000 },
          { month: 4, store: 'eBay', totalAmount: 8500 },
          { month: 4, store: 'Walmart', totalAmount: 11500 },

          { month: 5, store: 'Amazon', totalAmount: 18000 },
          { month: 5, store: 'eBay', totalAmount: 9200 },
          { month: 5, store: 'Walmart', totalAmount: 13000 },
        ];
      }

      const params = {};
      if (startDate) params.startDate = new Date(startDate).toISOString();
      if (endDate) params.endDate = new Date(endDate).toISOString();

      const response = await API.get('/sales/chart-data', { params });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchPendingAmount = createAsyncThunk(
  'dashboard/fetchPendingAmount',
  async ({ startDate, endDate } = {}, { rejectWithValue }) => {
    try {
      if (DEMO === 'true') {
        return 11700;
      }

      const params = {};
      if (startDate) params.startDate = new Date(startDate).toISOString();
      if (endDate) params.endDate = new Date(endDate).toISOString();

      const response = await API.get('/transactions/pending', { params });
      const total = response.data.reduce((sum, tx) => sum + tx.amount, 0);
      return total;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchPaidAmount = createAsyncThunk(
  'dashboard/fetchPaidAmount',
  async ({ startDate, endDate } = {}, { rejectWithValue }) => {
    try {
      if (DEMO === 'true') {
        return 35690;
      }

      const params = {};
      if (startDate) params.startDate = new Date(startDate).toISOString();
      if (endDate) params.endDate = new Date(endDate).toISOString();

      const response = await API.get('/transactions/paid', { params });
      const total = response.data.reduce((sum, tx) => sum + tx.amount, 0);
      return total;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchSocialMediaStats = createAsyncThunk(
  'dashboard/fetchSocialMediaStats',
  async (_, { rejectWithValue }) => {
    try {
      if (DEMO === 'true') {
        return { totalLikes: 9320, totalViews: 89100 };
      }

      const response = await API.get('/socialMediaPages');
      const pages = response.data;

      const totalLikes = pages.reduce((sum, p) => sum + (p.likes || 0), 0);
      const totalViews = pages.reduce((sum, p) => sum + (p.pageViews || 0), 0);

      return { totalLikes, totalViews };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchSignupSources = createAsyncThunk(
  'dashboard/fetchSignupSources',
  async (_, { rejectWithValue }) => {
    try {
      if (DEMO === 'true') {
        return [
          {
            signupSource: 'Google Ads',
            totalUsers: 320,
            conversionRate: '12%',
          },
          {
            signupSource: 'Facebook Ads',
            totalUsers: 210,
            conversionRate: '9%',
          },
          {
            signupSource: 'Organic Search',
            totalUsers: 540,
            conversionRate: '18%',
          },
          { signupSource: 'Referral', totalUsers: 160, conversionRate: '7%' },
          {
            signupSource: 'Email Campaign',
            totalUsers: 95,
            conversionRate: '5%',
          },
        ];
      }

      const response = await API.get('/sites/conversion-rate');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchSalesByCategory = createAsyncThunk(
  'dashboard/fetchSalesByCategory',
  async ({ startDate, endDate } = {}, { rejectWithValue }) => {
    try {
      if (DEMO === 'true') {
        return [
          { category: 'Electronics', count: 420 },
          { category: 'Clothing', count: 310 },
          { category: 'Home & Kitchen', count: 275 },
          { category: 'Beauty', count: 190 },
          { category: 'Sports', count: 150 },
          { category: 'Books', count: 120 },
        ];
      }

      const params = {};
      if (startDate) params.startDate = new Date(startDate).toISOString();
      if (endDate) params.endDate = new Date(endDate).toISOString();

      const response = await API.get('/sales/sales-by-category', { params });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    totalSales: 0,
    pendingLeads: 0,
    totalUsers: 0,
    activeUsers: 0,
    socialLikes: 0,
    socialPageViews: 0,
    salesChartData: [],
    salesByCategory: [],
    signupSources: [],
    activeUsersRangeData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Total sales
      .addCase(fetchTotalSales.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalSales.fulfilled, (state, action) => {
        state.loading = false;
        state.totalSales = action.payload;
      })
      .addCase(fetchTotalSales.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Pending leads
      .addCase(fetchPendingLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingLeads.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingLeads = action.payload;
      })
      .addCase(fetchPendingLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Sales chart data
      .addCase(fetchSalesChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.salesChartData = action.payload;
      })
      .addCase(fetchSalesChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Pending amount
      .addCase(fetchPendingAmount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingAmount = action.payload;
      })
      .addCase(fetchPendingAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Paid amount
      .addCase(fetchPaidAmount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaidAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.paidAmount = action.payload;
      })
      .addCase(fetchPaidAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

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

      // Total Users
      .addCase(fetchTotalUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTotalUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.totalUsers = action.payload;
      })
      .addCase(fetchTotalUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Active Users
      .addCase(fetchActiveUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.activeUsers = action.payload;
      })
      .addCase(fetchActiveUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Social Media Stats
      .addCase(fetchSocialMediaStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSocialMediaStats.fulfilled, (state, action) => {
        state.loading = false;
        state.socialLikes = action.payload.totalLikes;
        state.socialPageViews = action.payload.totalViews;
      })
      .addCase(fetchSocialMediaStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Signup Sources
      .addCase(fetchSignupSources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSignupSources.fulfilled, (state, action) => {
        state.loading = false;
        state.signupSources = action.payload;
      })
      .addCase(fetchSignupSources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Active Users Range
      .addCase(fetchActiveUsersRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveUsersRange.fulfilled, (state, action) => {
        state.loading = false;
        state.activeUsersRangeData = action.payload;
      })
      .addCase(fetchActiveUsersRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;

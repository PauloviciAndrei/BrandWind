import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLeads, createLead, deleteLeadById } from './util/leadsAPI';

const DEMO = import.meta.env.VITE_DEMO_MODE === 'true';

export const getLeadsContent = createAsyncThunk('leads/fetchAll', async () => {
  return await fetchLeads();
});

export const addLeadAsync = createAsyncThunk('leads/add', async (newLead) => {
  return await createLead(newLead);
});

export const deleteLeadAsync = createAsyncThunk('leads/delete', async (id) => {
  if (DEMO) {
    return id;
  }
  await deleteLeadById(id);
  return id;
});

export const leadSlice = createSlice({
  name: 'leads',
  initialState: {
    isLoading: false,
    leads: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeadsContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLeadsContent.fulfilled, (state, action) => {
        ((state.leads = action.payload), (state.isLoading = false));
      })
      .addCase(getLeadsContent.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addLeadAsync.fulfilled, (state, action) => {
        state.leads.push(action.payload);
      })
      .addCase(deleteLeadAsync.fulfilled, (state, action) => {
        state.leads = state.leads.filter((lead) => lead._id != action.payload);
      });
  },
});

export default leadSlice.reducer;

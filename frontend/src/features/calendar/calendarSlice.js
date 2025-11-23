import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEventsAPI, createEventAPI } from './util/eventAPI';

export const fetchEvents = createAsyncThunk(
  'calendar/fetchEvents',
  async () => {
    return await fetchEventsAPI();
  }
);

export const addEventAsync = createAsyncThunk(
  'calendar/addEvent',
  async (event) => {
    return await createEventAPI(event);
  }
);

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addEventAsync.fulfilled, (state, action) => {
        state.events.push(action.payload);
      });
  },
});

export default calendarSlice.reducer;

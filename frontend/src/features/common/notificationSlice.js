import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchNotificationsAPI,
  markAsSeenAPI,
  createNotificationAPI,
} from './util/notificationsAPI';

// Fetch notifications
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchAll',
  async () => {
    return await fetchNotificationsAPI();
  }
);

// Mark as seen
export const markAsSeenAsync = createAsyncThunk(
  'notifications/markAsSeen',
  async (id) => {
    const updatedNotif = await markAsSeenAPI(id, { seen: true });
    return updatedNotif;
  }
);

// Create new notification
export const createNotificationAsync = createAsyncThunk(
  'notifications/create',
  async (notification) => {
    return await createNotificationAPI(notification);
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    list: [],
    noOfNotifications: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.noOfNotifications = action.payload.filter((n) => !n.seen).length;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Mark as seen
      .addCase(markAsSeenAsync.fulfilled, (state, action) => {
        const updated = action.payload;
        const notif = state.list.find((n) => n._id === updated._id);
        if (notif) {
          notif.seen = updated.seen;
        }
        state.noOfNotifications = state.list.filter((n) => !n.seen).length;
      })

      // Create
      .addCase(createNotificationAsync.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
        state.noOfNotifications++;
      });
  },
});

export default notificationsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { NOTIFICATIONS } from '../../utils/dummyData';

export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    pageTitle: 'Home', // current page title state management
    noOfNotifications: NOTIFICATIONS.filter((n) => !n.seen).length, // no of unread notifications
    newNotificationMessage: '', // message of notification to be shown
    newNotificationStatus: 1, // to check the notification type -  success/ error/ info
  },
  reducers: {
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload.title;
    },

    removeNotificationMessage: (state, action) => {
      state.newNotificationMessage = '';
    },

    showNotification: (state, action) => {
      state.newNotificationMessage = action.payload.message;
      state.newNotificationStatus = action.payload.status;
    },
  },
});

export const { setPageTitle, removeNotificationMessage, showNotification } =
  headerSlice.actions;

export default headerSlice.reducer;

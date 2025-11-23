import { configureStore } from '@reduxjs/toolkit';
import headerSlice from '../features/common/headerSlice';
import modalSlice from '../features/common/modalSlice';
import rightDrawerSlice from '../features/common/rightDrawerSlice';
import leadsSlice from '../features/leads/leadSlice';
import notificationsSlice from '../features/common/notificationSlice';
import calendarSlice from '../features/calendar/calendarSlice';
import teamSlice from '../features/settings/team/teamSlice';
import authSlice from '../features/user/slices/authSlice';
import profileSlice from '../features/settings/profilesettings/profileSlice';
import transactionSlice from '../features/transactions/transactionsSlice';
import dashboradSlice from '../features/dashboard/dashboardSlice';
import chartsSlice from '../features/charts/chartsSlice';

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  leads: leadsSlice,
  notifications: notificationsSlice,
  calendar: calendarSlice,
  team: teamSlice,
  auth: authSlice,
  profile: profileSlice,
  transactions: transactionSlice,
  dashboard: dashboradSlice,
  charts: chartsSlice,
};

export default configureStore({
  reducer: combinedReducer,
});

import CalendarView from '../../components/CalendarView';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { openRightDrawer } from '../common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../../utils/globalConstantUtil';
import { showNotification } from '../common/headerSlice';
import { useEffect } from 'react';
import { fetchEvents } from './calendarSlice';
import { openModal } from '../common/modalSlice';
import { MODAL_BODY_TYPES } from '../../utils/globalConstantUtil';

function Calendar() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.calendar.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const addNewEvent = (date) => {
    dispatch(
      openModal({
        title: 'Add new Event',
        bodyType: MODAL_BODY_TYPES.EVENT,
        extraObject: { date },
      })
    );
  };

  const openDayDetail = ({ filteredEvents, title }) => {
    dispatch(
      openRightDrawer({
        header: title,
        bodyType: RIGHT_DRAWER_TYPES.CALENDAR_EVENTS,
        extraObject: { filteredEvents },
      })
    );
  };

  return (
    <CalendarView
      calendarEvents={events}
      addNewEvent={addNewEvent}
      openDayDetail={openDayDetail}
    />
  );
}

export default Calendar;

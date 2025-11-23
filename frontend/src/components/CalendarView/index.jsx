import { useEffect, useState } from 'react';
import ChevronLeftIcon from '@heroicons/react/24/solid/ChevronLeftIcon';
import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon';
import moment from 'moment';
import { CALENDAR_EVENT_STYLE } from './util';
import { openModal } from '../../features/common/modalSlice';
import { MODAL_BODY_TYPES } from '../../utils/globalConstantUtil';
import { useDispatch, useSelector } from 'react-redux';

const THEME_BG = CALENDAR_EVENT_STYLE;

function CalendarView({ calendarEvents, addNewEvent, openDayDetail }) {
  const dispatch = useDispatch();
  const events = calendarEvents;

  const today = moment().startOf('day');
  const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
  ];

  const [firstDayOfMonth, setFirstDayOfMonth] = useState(
    moment().startOf('month')
  );
  const [currMonth, setCurrMonth] = useState(() =>
    moment(today).format('MMM-yyyy')
  );

  const allDaysInMonth = () => {
    let start = moment(firstDayOfMonth).startOf('week');
    let end = moment(moment(firstDayOfMonth).endOf('month')).endOf('week');
    var days = [];
    var day = start;
    while (day <= end) {
      days.push(day.toDate());
      day = day.clone().add(1, 'd');
    }
    return days;
  };

  const getEventsForCurrentDate = (date) => {
    let filteredEvents = events.filter((e) => {
      const start = moment(e.startTime);
      const end = moment(e.endTime);
      return moment(date).isBetween(start, end, 'day', '[]');
    });

    if (filteredEvents.length > 2) {
      let originalLength = filteredEvents.length;
      filteredEvents = filteredEvents.slice(0, 2);
      filteredEvents.push({
        title: `${originalLength - 2} more`,
        theme: 'MORE',
      });
    }
    return filteredEvents;
  };

  const openAllEventsDetail = (date, theme) => {
    if (theme != 'MORE') return 1;
    let filteredEvents = events
      .filter((e) => {
        return (
          moment(date).format('YYYY-MM-DD') ===
          moment(e.startTime).local().format('YYYY-MM-DD')
        );
      })
      .map((e) => ({ title: e.title, theme: e.theme }));
    openDayDetail({ filteredEvents, title: moment(date).format('D MMM YYYY') });
  };

  const isToday = (date) => {
    return moment(date).isSame(moment(), 'day');
  };

  const isDifferentMonth = (date) => {
    return moment(date).month() != moment(firstDayOfMonth).month();
  };

  const getPrevMonth = (event) => {
    const firstDayOfPrevMonth = moment(firstDayOfMonth)
      .add(-1, 'M')
      .startOf('month');
    setFirstDayOfMonth(firstDayOfPrevMonth);
    setCurrMonth(moment(firstDayOfPrevMonth).format('MMM-yyyy'));
  };

  const getCurrentMonth = (event) => {
    const firstDayOfCurrMonth = moment().startOf('month');
    setFirstDayOfMonth(firstDayOfCurrMonth);
    setCurrMonth(moment(firstDayOfCurrMonth).format('MMM-yyyy'));
  };

  const getNextMonth = (event) => {
    const firstDayOfNextMonth = moment(firstDayOfMonth)
      .add(1, 'M')
      .startOf('month');
    setFirstDayOfMonth(firstDayOfNextMonth);
    setCurrMonth(moment(firstDayOfNextMonth).format('MMM-yyyy'));
  };

  const handleAddEventClick = (date) => {
    addNewEvent(date);
  };

  const handleDayClick = (date) => {
    const filteredEvents = events
      .filter((e) => {
        const start = moment(e.startTime);
        const end = moment(e.endTime);
        return moment(date).isBetween(start, end, 'day', '[]');
      })
      .map((e) => ({ title: e.title, theme: e.theme }));

    openDayDetail({ filteredEvents, title: moment(date).format('D MMM YYYY') });
  };

  return (
    <>
      <div className="w-full  bg-base-100 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex  justify-normal gap-2 sm:gap-4">
            <p className="font-semibold text-xl w-48">
              {moment(firstDayOfMonth).format('MMMM yyyy').toString()}
            </p>

            <button
              className="btn  btn-square btn-sm btn-ghost"
              onClick={getPrevMonth}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              className="btn  btn-sm btn-ghost normal-case"
              onClick={getCurrentMonth}
            >
              Current Month
            </button>
            <button
              className="btn btn-square btn-sm btn-ghost"
              onClick={getNextMonth}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
          <div>
            <button
              className="btn  btn-sm btn-ghost btn-outline normal-case"
              onClick={() => handleAddEventClick()}
            >
              Add new Event
            </button>
          </div>
        </div>
        <div className="my-4 divider" />
        <div className="grid grid-cols-7 gap-6 sm:gap-12 place-items-center">
          {weekdays.map((day, key) => {
            return (
              <div className="text-xs capitalize" key={key}>
                {day}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-7 mt-1  place-items-center">
          {allDaysInMonth().map((day, idx) => {
            return (
              <div
                key={idx}
                className={
                  colStartClasses[moment(day).day().toString()] +
                  ' border border-solid w-full h-28  '
                }
              >
                <p
                  onClick={() => handleDayClick(day)}
                  className={`flex items-center justify-center h-8 w-8 rounded-full mx-1 mt-1 text-sm cursor-pointer transition-colors
                    hover:bg-base-300
                    ${isToday(day) ? 'bg-primary text-primary-content' : ''}
                    ${isDifferentMonth(day) ? 'text-base-300' : 'text-base-content'}`}
                >
                  {moment(day).format('D')}
                </p>
                {getEventsForCurrentDate(day).map((e, k) => {
                  return (
                    <p
                      key={k}
                      onClick={() => openAllEventsDetail(day, e.theme)}
                      className={`text-xs px-2 mt-1 truncate  ${THEME_BG[e.theme] || ''}`}
                    >
                      {e.title}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CalendarView;

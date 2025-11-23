import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../common/modalSlice';
import { showNotification } from '../../common/headerSlice';
import moment from 'moment';
import { addEventAsync } from '../calendarSlice';
import { CALENDAR_EVENT_STYLE } from '../../../components/CalendarView/util';
import Pikaday from 'pikaday';

const COLOR_OPTIONS = ['GREEN', 'PINK', 'PURPLE', 'BLUE', 'ORANGE'];

function AddEventModalBody({ extraObject }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('GREEN');
  const [date, setDate] = useState({ startDate: null, endDate: null });

  // Refs for Pikaday fields
  const startInputRef = useRef(null);
  const endInputRef = useRef(null);
  const startPickerRef = useRef(null);
  const endPickerRef = useRef(null);

  useEffect(() => {
    if (!startInputRef.current || !endInputRef.current) return;

    const updateRange = (start, end) => {
      setDate({ startDate: start, endDate: end });
    };

    const startPicker = new Pikaday({
      field: startInputRef.current,
      format: 'YYYY-MM-DD',
      position: 'top right',
      reposition: false,
      onSelect: (start) => {
        const end = endPickerRef.current?.getDate() || start;
        endPickerRef.current?.setMinDate(start);
        updateRange(start, end);
      },
    });

    const endPicker = new Pikaday({
      field: endInputRef.current,
      format: 'YYYY-MM-DD',
      position: 'top right',
      reposition: false,
      onSelect: (end) => {
        const start = startPickerRef.current?.getDate() || end;
        startPickerRef.current?.setMaxDate(end);
        updateRange(start, end);
      },
    });

    startPickerRef.current = startPicker;
    endPickerRef.current = endPicker;

    return () => {
      startPicker.destroy();
      endPicker.destroy();
    };
  }, []);

  const handleAddEvent = () => {
    if (!title.trim()) {
      dispatch(
        showNotification({ message: 'Please enter a title!', status: 0 })
      );
      return;
    }

    if (!date.startDate || !date.endDate) {
      dispatch(
        showNotification({ message: 'Please select a date range!', status: 0 })
      );
      return;
    }

    const newEvent = {
      title,
      theme,
      startTime: moment(date.startDate).startOf('day').toISOString(),
      endTime: moment(date.endDate).endOf('day').toISOString(),
    };

    dispatch(addEventAsync(newEvent))
      .unwrap()
      .then(() => {
        dispatch(showNotification({ message: 'New Event Added!', status: 1 }));
        dispatch(closeModal());
      })
      .catch(() => {
        dispatch(
          showNotification({ message: 'Failed to add event!', status: 0 })
        );
      });
  };

  return (
    <div className="flex flex-col flex-1 space-y-10 p-4">
      {/* Event title */}
      <div>
        <label className="label font-semibold">Event Title</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Theme selector */}
      <div>
        <label className="label font-semibold mb-2">Theme</label>
        <div className="flex gap-2">
          {COLOR_OPTIONS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTheme(t)}
              className={`w-12 h-12 rounded-full border-2 ${
                theme === t
                  ? 'border-black dark:border-white'
                  : 'border-gray-300'
              } ${CALENDAR_EVENT_STYLE[t]}`}
            />
          ))}
        </div>
      </div>

      {/* Pikaday date range */}
      <div>
        <label className="label font-semibold">Date Range</label>
        <div className="flex items-center gap-2">
          <input
            ref={startInputRef}
            type="text"
            placeholder="Start date"
            className="input input-bordered w-1/2"
            readOnly
          />
          <span className="font-semibold">→</span>
          <input
            ref={endInputRef}
            type="text"
            placeholder="End date"
            className="input input-bordered w-1/2"
            readOnly
          />
        </div>
      </div>

      {/* Add Event Button */}
      <button className="btn btn-primary w-full mt-2" onClick={handleAddEvent}>
        Add Event
      </button>
    </div>
  );
}

export default AddEventModalBody;

import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import DoughnutChart from './components/DoughnutChart';
import PieChart from './components/PieChart';
import ScatterChart from './components/ScatterChart';
import StackBarChart from './components/StackBarChart';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchSalesByCategory,
  fetchSalesByCountry,
  fetchSalesCountChartData,
} from './chartsSlice';
import Pikaday from 'pikaday';

function Charts() {
  const dispatch = useDispatch();

  const [dateValue, setDateValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const startInputRef = useRef(null);
  const endInputRef = useRef(null);
  const startPickerRef = useRef(null);
  const endPickerRef = useRef(null);

  useEffect(() => {
    if (!startInputRef.current || !endInputRef.current) return;

    const updateRange = (start, end) => {
      setDateValue({ startDate: start, endDate: end });
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

  useEffect(() => {
    const { startDate, endDate } = dateValue;
    dispatch(fetchSalesByCategory({ startDate, endDate }));
    dispatch(fetchSalesByCountry({ startDate, endDate }));
    dispatch(fetchSalesCountChartData({ startDate, endDate }));
  }, [dispatch, dateValue]);

  return (
    <>
      {/* Pikaday date range picker */}
      <div className="flex items-center gap-2 mb-4">
        <input
          ref={startInputRef}
          type="text"
          placeholder="Start date"
          className="input input-bordered w-36"
          readOnly
        />
        <span className="font-semibold">→</span>
        <input
          ref={endInputRef}
          type="text"
          placeholder="End date"
          className="input input-bordered w-36"
          readOnly
        />
      </div>

      {/* Charts grid */}
      <div className="grid lg:grid-cols-2 mt-0 grid-cols-1 gap-6">
        <StackBarChart />
        <BarChart />
      </div>

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <DoughnutChart />
        <PieChart />
      </div>
    </>
  );
}

export default Charts;

import ArrowDownTrayIcon from '@heroicons/react/24/outline/ArrowDownTrayIcon';
import ShareIcon from '@heroicons/react/24/outline/ShareIcon';
import ArrowPathIcon from '@heroicons/react/24/outline/ArrowPathIcon';
import { useState, useEffect, useRef } from 'react';
import Pikaday from 'pikaday';
import 'pikaday';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../common/headerSlice';

function DashboardTopBar({ updateDashboardPeriod, dashboardRef, refreshData }) {
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
    const theme = document.documentElement.getAttribute('data-theme');
    const popup = document.querySelector('.pika-single');
    if (popup && theme) popup.setAttribute('data-theme', theme);
  }, []);

  useEffect(() => {
    if (!startInputRef.current || !endInputRef.current) return;

    const updateRange = (start, end) => {
      if (start && end) {
        setDateValue({ startDate: start, endDate: end });
        updateDashboardPeriod({ startDate: start, endDate: end });

        dispatch(
          showNotification({
            message: `Date range updated: ${start.toDateString()} → ${end.toDateString()}`,
            status: 1,
          })
        );
      }
    };

    const startPicker = new Pikaday({
      field: startInputRef.current,
      format: 'YYYY-MM-DD',
      onSelect: (date) => {
        const endDate = endPickerRef.current?.getDate() || new Date();
        updateRange(date, endDate);
        endPickerRef.current?.setMinDate(date);
      },
    });

    const endPicker = new Pikaday({
      field: endInputRef.current,
      format: 'YYYY-MM-DD',
      onSelect: (date) => {
        const startDate = startPickerRef.current?.getDate() || new Date();
        updateRange(startDate, date);
        startPickerRef.current?.setMaxDate(date);
      },
    });

    // store refs so we can access them later
    startPickerRef.current = startPicker;
    endPickerRef.current = endPicker;

    // initialize with current values
    startPicker.setDate(dateValue.startDate);
    endPicker.setDate(dateValue.endDate);

    return () => {
      startPicker.destroy();
      endPicker.destroy();
    };
  }, []);

  useEffect(() => {
    if (startPickerRef.current && endPickerRef.current) {
      startPickerRef.current.setDate(dateValue.startDate, true);
      endPickerRef.current.setDate(dateValue.endDate, true);
    }
  }, [dateValue]);

  const downloadDashboardPDF = async () => {
    if (!dashboardRef.current) return;
    try {
      const canvas = await html2canvas(dashboardRef.current, {
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;
      let position = 0;
      let heightLeft = pdfHeight;
      pdf.addImage(imgData, 'PNG', 0, position, pageWidth, pdfHeight);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pageWidth, pdfHeight);
        heightLeft -= pageHeight;
      }
      pdf.save('dashboard.pdf');
    } catch (error) {
      console.error('PDF generation failed:', error);
    }
  };

  const shareDashboardSnapshot = async () => {
    if (!dashboardRef.current) return;
    const canvas = await html2canvas(dashboardRef.current, {
      scale: 2,
      useCORS: true,
    });
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        dispatch(
          showNotification({
            message: 'Dashboard image copied to clipboard!',
            status: 1,
          })
        );
      } catch (err) {
        console.error('Copy failed:', err);
      }
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* === Date Range Picker === */}
      <div className="flex items-center gap-2">
        <input
          ref={startInputRef}
          type="text"
          className="input input-bordered w-36 text-center"
          placeholder="Start date"
          readOnly
        />
        <span className="font-semibold">→</span>
        <input
          ref={endInputRef}
          type="text"
          className="input input-bordered w-36 text-center"
          placeholder="End date"
          readOnly
        />
      </div>

      {/* === Action Buttons === */}
      <div className="text-right">
        <button
          className="btn btn-ghost btn-sm normal-case"
          onClick={refreshData}
        >
          <ArrowPathIcon className="w-4 mr-2" />
          Refresh Data
        </button>

        <button
          className="btn btn-ghost btn-sm normal-case ml-2"
          onClick={shareDashboardSnapshot}
        >
          <ShareIcon className="w-4 mr-2" />
          Share
        </button>

        <button
          className="btn btn-ghost btn-sm normal-case ml-2"
          onClick={downloadDashboardPDF}
        >
          <ArrowDownTrayIcon className="w-4 mr-2" />
          Download
        </button>
      </div>
    </div>
  );
}

export default DashboardTopBar;

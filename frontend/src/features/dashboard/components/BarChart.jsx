import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart() {
  const { salesChartData } = useSelector((state) => state.dashboard);
  const storeColors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const months = [...new Set(salesChartData.map((d) => d.month))].sort(
    (a, b) => a - b
  );
  const labels = months.map((m) => monthNames[m - 1]);

  const stores = [...new Set(salesChartData.map((d) => d.store))];

  const datasets = stores.map((store, idx) => ({
    label: store,
    data: months.map((monthNum) => {
      const monthData = salesChartData.find(
        (d) => d.store === store && d.month === monthNum
      );
      return monthData ? monthData.totalAmount : 0;
    }),
    backgroundColor: storeColors[idx % storeColors.length],
  }));

  const data = { labels, datasets };

  return (
    <TitleCard title={'Revenue'}>
      <Bar options={options} data={data} />
    </TitleCard>
  );
}

export default BarChart;

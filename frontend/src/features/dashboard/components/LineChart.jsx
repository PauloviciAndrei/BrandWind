import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function LineChart() {
  const { activeUsersRangeData, loading } = useSelector(
    (state) => state.dashboard
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const labels = activeUsersRangeData.map((item) => item.month);
  const values = activeUsersRangeData.map((item) => item.activeUsers);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'MAU',
        data: values,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <TitleCard title={'Monthly Active Users'}>
      {loading ? (
        <div className="text-center p-8">Loading chart...</div>
      ) : (
        <Line data={data} options={options} />
      )}
    </TitleCard>
  );
}

export default LineChart;

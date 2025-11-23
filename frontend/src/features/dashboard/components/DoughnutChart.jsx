import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';
import Subtitle from '../../../components/Typography/Subtitle';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend, Tooltip, Filler, Legend);

function DoughnutChart() {
  const { salesByCategory } = useSelector((state) => state.dashboard);

  const baseColors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
  ];

  function extendColors(count) {
    return Array.from({ length: count }, (_, i) => {
      const base = baseColors[i % baseColors.length];
      const alpha = 0.6 + 0.4 * ((i / count) % 1);
      return base.replace(/0\.8\)$/, `${alpha})`);
    });
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const labels = salesByCategory.map((item) => item.category);
  const counts = salesByCategory.map((item) => item.count);
  const colors = extendColors(labels.length);

  const data = {
    labels,
    datasets: [
      {
        label: '# of Sales',
        data: counts,
        backgroundColor: colors,
        borderColor: colors.map((c) => c.replace(/0\.\d+\)$/, '1)')),
        borderWidth: 1,
      },
    ],
  };

  return (
    <TitleCard title={'Orders by Category'}>
      <Doughnut options={options} data={data} />
    </TitleCard>
  );
}

export default DoughnutChart;

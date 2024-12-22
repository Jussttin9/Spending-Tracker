import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

interface PieChartProps {
  data: number[];
  labels: string[];
  backgroundColors: string[];
}

const PieChart: React.FC<PieChartProps> = ({ data, labels, backgroundColors }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: backgroundColors,
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // TypeScript for strict typings
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return tooltipItem.label + ': ' + tooltipItem.raw;
          },
        },
      },
    },
  };

  return (
    <div className="h-full flex justify-center">
        <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;

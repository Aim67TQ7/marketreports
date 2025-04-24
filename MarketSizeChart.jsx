import React from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement);

const MarketSizeChart = ({ data }) => {
  const chartData = {
    labels: data.years.map(year => year.toString()),
    datasets: [
      {
        label: 'Market Size ($ Billions)',
        data: data.values,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Market Size Growth (CAGR: ${data.cagr}%)`,
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `$${context.parsed.y} Billion`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Market Size ($ Billions)'
        },
        ticks: {
          callback: function(value) {
            return '$' + value + 'B';
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Year'
        }
      }
    }
  };

  return <Line data={chartData} options={options} />;
};

export default MarketSizeChart;

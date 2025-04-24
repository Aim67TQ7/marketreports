import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TrendAnalysisChart = ({ data, years }) => {
  // Generate colors for different trend lines
  const lineColors = [
    { borderColor: 'rgba(75, 192, 192, 1)', backgroundColor: 'rgba(75, 192, 192, 0.2)' },
    { borderColor: 'rgba(255, 99, 132, 1)', backgroundColor: 'rgba(255, 99, 132, 0.2)' },
    { borderColor: 'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235, 0.2)' },
    { borderColor: 'rgba(255, 206, 86, 1)', backgroundColor: 'rgba(255, 206, 86, 0.2)' },
    { borderColor: 'rgba(153, 102, 255, 1)', backgroundColor: 'rgba(153, 102, 255, 0.2)' }
  ];

  const chartData = {
    labels: years.map(year => year.toString()),
    datasets: data.map((trend, index) => ({
      label: trend.name,
      data: trend.data,
      fill: false,
      borderColor: lineColors[index % lineColors.length].borderColor,
      backgroundColor: lineColors[index % lineColors.length].backgroundColor,
      borderWidth: 2,
      pointBackgroundColor: lineColors[index % lineColors.length].borderColor,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: lineColors[index % lineColors.length].borderColor,
      tension: 0.4,
      yAxisID: `y${index}`
    }))
  };

  // Create dynamic scales based on the number of trends
  const scales = {
    x: {
      title: {
        display: true,
        text: 'Year'
      }
    }
  };

  // Add a y-axis for each trend
  data.forEach((trend, index) => {
    scales[`y${index}`] = {
      type: 'linear',
      display: index === 0 ? true : false, // Only show first y-axis
      position: index === 0 ? 'left' : 'right',
      title: {
        display: index === 0,
        text: trend.name
      },
      grid: {
        drawOnChartArea: index === 0 // Only draw grid for first y-axis
      }
    };
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Key Market Trends (2021-2030)',
        font: {
          size: 16
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: scales,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  return <Line data={chartData} options={options} />;
};

export default TrendAnalysisChart;

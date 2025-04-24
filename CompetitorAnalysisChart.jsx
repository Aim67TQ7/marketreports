import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const CompetitorAnalysisChart = ({ data }) => {
  // Generate colors for pie chart segments
  const generateColors = (count) => {
    const baseColors = [
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 99, 132, 0.8)',
      'rgba(75, 192, 192, 0.8)',
      'rgba(255, 206, 86, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)',
      'rgba(199, 199, 199, 0.8)',
      'rgba(83, 102, 255, 0.8)',
      'rgba(78, 129, 189, 0.8)',
      'rgba(192, 80, 77, 0.8)',
    ];
    
    // If we need more colors than in our base set, generate them
    if (count > baseColors.length) {
      for (let i = baseColors.length; i < count; i++) {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        baseColors.push(`rgba(${r}, ${g}, ${b}, 0.8)`);
      }
    }
    
    return baseColors.slice(0, count);
  };

  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        data: data.map(item => item.share),
        backgroundColor: generateColors(data.length),
        borderColor: generateColors(data.length).map(color => color.replace('0.8', '1')),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 15,
          padding: 15
        }
      },
      title: {
        display: true,
        text: 'Market Share by Company (%)',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    }
  };

  return <Pie data={chartData} options={options} />;
};

export default CompetitorAnalysisChart;

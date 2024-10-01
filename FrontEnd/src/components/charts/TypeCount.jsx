import React from 'react';
import './DashChart.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TypeCount = () => {
  const data = {
    labels: ['Laptops', 'Headhpones', 'TV', 'Mouse', 'Desktop', 'Keyboard'],
    datasets: [
      {
        label: 'Sales',
        data: [18, 32, 28, 10, 5, 2],
        backgroundColor: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'], 
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to grow with container size
    indexAxis: 'y', // Horizontal bars
    plugins: {
      legend: {
        display: false, // Hide the default legend
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
        cornerRadius: 6,
      },
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: false, // Hide the grid lines
        },
        ticks: {
          beginAtZero: true, 
         
        },
        min: 0, // Ensure the bars cover the full length of the x-axis
      },
      y: {
        grid: {
          drawOnChartArea: false, // Hide the grid lines
        },
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 5,
        bottom: 5,
      },
    },
  };
  

  return (
    <div className="chart-container p-0">
      <div className="product-info">
        <Bar data={data} options={options} />
      </div>

    </div>
  );
};

export default TypeCount;

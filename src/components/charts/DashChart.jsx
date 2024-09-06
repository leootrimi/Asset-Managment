import React from 'react';
import './DashChart.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BestSellingProductsChart = () => {
  const data = {
    labels: ['Product A', 'Product B', 'Product C'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80],
        backgroundColor: ['#17153B', '#2E236C', '#2E236C'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="products">
      <div className="product-info">
        <Bar data={data} options={options} />
      </div>
      <div className="data">
        <ul>
          <li><span className="color-box" style={{ backgroundColor: "#FF6384" }}></span> Product A</li>
          <li><span className="color-box" style={{ backgroundColor: "#36A2EB" }}></span> Product B</li>
          <li><span className="color-box" style={{ backgroundColor: "#FFCE56" }}></span> Product C</li>
        </ul>
      </div>
    </div>
  );
};

export default BestSellingProductsChart;

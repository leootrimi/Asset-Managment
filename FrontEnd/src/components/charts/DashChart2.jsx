import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function DashChart2() {
    const data = {
        labels: ['Laptops', 'Desktops', 'Headphones', 'TV', 'Mouse'],
        datasets: [
            {
                label: 'Total Price in $',
                data: [12000, 8000, 3500, 1500, 500],
                backgroundColor: ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],
                hoverBackgroundColor: ['#FF99A4', '#6AC3FF', '#FFE181', '#80E0E0', '#BA99FF'],
                borderWidth: 2,
                borderColor: '#fff',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
                align: 'center',
                labels: {
                    boxWidth: 15,
                    padding: 20,
                    font: {
                        size: 14,
                        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                        weight: 'bold',
                    },
                },
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem) {
                        const value = tooltipItem.raw;
                        const total = data.datasets[0].data.reduce((acc, item) => acc + item, 0);
                        const percentage = ((value / total) * 100).toFixed(2);
                        return `$${value} (${percentage}%)`;
                    },
                },
                backgroundColor: '#333',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#fff',
                borderWidth: 1,
                cornerRadius: 6,
                padding: 10,
            },
        },
        layout: {
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div>
            <Doughnut data={data} options={options} />
        </div>
    );
}

export default DashChart2;

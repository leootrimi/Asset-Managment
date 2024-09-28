import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AgeDistributionChart = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = chartRef.current;

        if (chart) {
            const gradient = chart.ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, '#17153B');
            gradient.addColorStop(1, '#433D8B'); 

            chart.data.datasets[0].borderColor = gradient;
            chart.update();
        }
    }, []);

    const data = {
        labels: ['< 1 year', '1-3 years', '3-5 years'],
        datasets: [
            {
                label: 'Equipment Count',
                data: [10, 17, 7],
                borderColor: '#17153B', 
                fill: true, 
                backgroundColor: 'rgba(23, 21, 59, 0.1)',
                tension: 0.4, 
                pointBackgroundColor: '#17153B',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4, 
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Disable default aspect ratio
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                    },
                    color: '#333',
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#17153B',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 10,
                cornerRadius: 6,
                bodyFont: {
                    size: 12,
                },
                titleFont: {
                    size: 14,
                },
            },
            title: {
                display: true,
                text: 'Age of Equipment',
                font: {
                    size: 15,
                },
                color: '#333',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    },
                    beginAtZero: true,
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)', // Lighter gridlines
                },
            },
        },
        animation: {
            duration: 1500,
            easing: 'easeInOutQuart',
        },
    };

    return (
        <div className='text-center d-flex w-75' style={{ position: 'relative',  height: '150px' }}> {/* Adjust width and height here */}
            <Line ref={chartRef} data={data} options={options} />
            <div className="counts">
                {data.labels.map((label, index) => (
                    <div key={index} className="count-label">
                        {label}: {data.datasets[0].data[index]}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AgeDistributionChart;

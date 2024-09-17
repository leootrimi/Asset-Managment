import React, { useState, useEffect } from 'react';
import { BiLock, BiUserCircle, BiBarChart, BiLineChart, BiGlobe, BiMoney } from "react-icons/bi";
import { BsTools } from "react-icons/bs";
import Navbar from "../../components/navbar/Navbar";
import './Dashboard.css';
import { Doughnut } from 'react-chartjs-2';
import BestSellingProductsChart from '../../components/charts/DashChart'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { fetchCount, fetchTotal } from "../../services/Dashboard";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [totalEquipments, setTotalEquipments] = useState(null); 
    const [totalPrice, setTotalPrice] = useState(null); 

    useEffect(() => {
        const getCountAndPrice = async () => {
            try {
                const [countResponse, priceResponse] = await Promise.all([fetchCount(), fetchTotal()]);

                setTotalEquipments(countResponse.count);
                setTotalPrice(priceResponse.total_price);
                
                console.log('Total price:', priceResponse.total_price);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        getCountAndPrice();
    }, []);
    

    const data = {
        labels: ['Product A', 'Product B', 'Product C'],
        datasets: [
          {
            label: 'Sales',
            data: [65, 59, 80], 
            backgroundColor: ['#17153B', '#2E236C', '#433D8B'],
            hoverBackgroundColor: ['#C8ACD6', '#C8ACD6', '#C8ACD6'],
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
          boxWidth: 20,   
          padding: 20,     
          font: {
            size: 14,     
          },
        },
          },
          tooltip: {
            enabled: true,
          },
        },
        layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 50, 
        right: 50, 
      },
    },
    maintainAspectRatio: false,
  };
    
    return (
        <div className="dashboard m-3 mt-0">
             <Navbar pageTitle="General Information" />
            <div className="dashboard-header">
                <div className="header-left">
                    <h1>Dashboard</h1>
                    <p>Here's your analytic details.</p>
                </div>
                <div className="header-right">
                    
                    <BiUserCircle className="profile-icon" />
                </div>
            </div>
            
                    <div className="dashboard-metrics d-flex flex-row gap-1 col-12">
                <div className="metric-box col-3">
                    <BsTools className="metric-icon" />
                    <div className="metric-details">
                        <h3>Total equipments</h3>
                        <p className="metric-number">{totalEquipments !== null ? totalEquipments : 'Loading...'}</p>
                        <span className="metric-change positive">+12 from June</span>
                    </div>
                </div>
                <div className="metric-box col-3">
                    <BiUserCircle className="metric-icon" />
                    <div className="metric-details">
                        <h3>Equipment in use</h3>
                        <p className="metric-number">27</p>
                        <span className="metric-change positive">+5 from June</span>
                    </div>
                </div>
                <div className="metric-box col-3">
                    <BiLock className="metric-icon" />
                    <div className="metric-details">
                        <h3>Deprecated equipments</h3>
                        <p className="metric-number">7</p>
                        <span className="metric-change negative">-10.07% from June</span>
                    </div>
                </div>
                <div className="metric-box col-3">
                    <BiUserCircle className="metric-icon" />
                    <div className="metric-details">
                        <h3>Conversion rate</h3>
                        <p className="metric-number">98.56%</p>
                        <span className="metric-change positive">+2.50% from June</span>
                    </div>
                </div>
            </div>

            <div className="sales-chart mt-2 d-flex flex-row gap-2">
                <div className="total-price col-6">
                    <h5 className="h mt-3">Overall equipment price</h5>
                    <p className="metric-number">${totalPrice}</p>
                    <span className="metric-change positive">+78.50%</span>
                </div>
                <div className="total-price col-6">
                    <BestSellingProductsChart />
                </div>
            </div>

            <div className="dashboard-lower-section d-flex flex-row gap-2 mt-2">
                <div className="countries-list col-6">
                    <h3 className="h mt-3">Age distribution</h3>
                    <ul>
                        <li> &lt; 1 year <span>10 equipments</span></li>
                        <li>1-3 years: <span>17 equipments</span></li>
                        <li>3-5 years: <span>7</span></li>
                        <li>Mexico <span>56.234</span></li>
                    </ul>
                </div>
                <div className="best-selling-products col-6">
                    <div className="chart">
                    <Doughnut data={data} options={options} style={{ width: '250px', height: '250px' }}  />
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default Dashboard;

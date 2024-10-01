import React, { useState, useEffect } from 'react';
import { BiLock, BiUserCircle, BiBarChart, BiLineChart, BiGlobe, BiMoney } from "react-icons/bi";
import { BsTools } from "react-icons/bs";
import Navbar from "../../components/navbar/Navbar";
import DashboardMetrics from '../../components/DashboardMetrics/DashboardMetrics';
import './Dashboard.css';
import DashChart2 from '../../components/charts/DashChart2';
import DashChart3 from '../../components/charts/DashChart3';
import { Box, Grid, Typography, ListItem, ListItemText, List } from '@mui/material';
import TypeCount from '../../components/charts/TypeCount'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { fetchCount, fetchTotal } from "../../services/Dashboard";


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
            
            <DashboardMetrics />

            <div className="sales-chart mt-2 d-flex flex-row gap-2">
                <Box className="total-price d-flex flex-column gap-1 text-center justify-content-center align-items-center" sx={{ flex: 1 }}>
                    <Typography className="h">Total equipment price</Typography>
                    <Typography variant="body1" className="metric-number">${totalPrice}</Typography>
                    <Typography variant="body2" className="metric-change positive">+78.50%</Typography>
                </Box>
                <Box className="total-price d-flex flex-column gap-1 text-center justify-content-center align-items-center" sx={{ flex: 1 }}>
                    <Typography className="h">Total equipment price</Typography>
                    <Typography variant="body1" className="metric-number">${totalPrice}</Typography>
                    <Typography variant="body2" className="metric-change positive">+78.50%</Typography>
                </Box>
                <div className="total-price col-6">
                    <TypeCount />
                </div>
            </div>

            <div className="dashboard-lower-section d-flex flex-row gap-2 mt-2">
            <div className="countries-list col-6 text-center">
            <DashChart3 />
            </div>
                <div className="best-selling-products col-6">
                    <div className="chart">
                    <DashChart2 />
                    </div>
                </div>
            </div> 
        </div>
    );
};

export default Dashboard;

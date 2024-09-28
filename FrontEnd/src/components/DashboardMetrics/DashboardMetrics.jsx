import React, { useState, useEffect } from 'react';
import laptop2 from '../../assets/laptop.png';
import student from '../../assets/student.png';
import decrease from '../../assets/statistics.png';
import clock from '../../assets/deadline.png';
import { Grid, Typography, Box } from '@mui/material';
import { fetchCount, fetchTotal } from "../../services/Dashboard";

const DashboardMetrics = () => {
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
        <Grid container spacing={1} className="dashboard-metrics">
            <Grid item xs={12} sm={6} md={3}>
                <Box className="metric-box" display="flex" alignItems="center">
                    <img src={laptop2} className='w-25 h-25' alt="Total Equipments" />
                    <Box ml={2}>
                        <Typography>Total Equipments</Typography>
                        <Typography variant="body1" className="metric-number">
                            <strong>{totalEquipments !== null ? totalEquipments : 'Loading...'}</strong>
                        </Typography>
                        <Typography variant="body2" className="metric-change positive">+12 from June</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Box className="metric-box" display="flex" alignItems="center">
                    <img src={student} className='w-25 h-25' alt="Equipment in Use" />
                    <Box ml={2}>
                        <Typography>Equipment in Use</Typography>
                        <Typography variant="body1" className="metric-number"><strong>27</strong></Typography>
                        <Typography variant="body2" className="metric-change positive">+5 from June</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Box className="metric-box" display="flex" alignItems="center">
                    <img src={decrease} className='w-25 h-25' alt="Expired Equipment" />
                    <Box ml={2}>
                        <Typography>Expired</Typography>
                        <Typography variant="body1" className="metric-number"><strong>7</strong></Typography>
                        <Typography variant="body2" className="metric-change negative">-10.07% from June</Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Box className="metric-box" display="flex" alignItems="center">
                    <img src={clock} className='w-25 h-25' alt="Requests" />
                    <Box ml={2}>
                        <Typography>Requests</Typography>
                        <Typography variant="body1" className="metric-number">9</Typography>
                        <Typography variant="body2" className="metric-change positive">Dacks</Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default DashboardMetrics;

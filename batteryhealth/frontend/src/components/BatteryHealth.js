import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BatteryHealth = () => {
    const [batteryData, setBatteryData] = useState(null);
    const [recommendations, setRecommendations] = useState('');

    useEffect(() => {
        const fetchBatteryData = async () => {
            const response = await axios.get('/api/battery-health');
            setBatteryData(response.data);
            setRecommendations(response.data.recommendations);
        };
        fetchBatteryData();
    }, []);

    return (
        <div>
            <h1>Battery Health Status</h1>
            {batteryData && (
                <div>
                    <p>Battery Usage: {batteryData.usage}</p>
                    <p>Remaining Lifespan: {batteryData.lifespan}</p>
                    <p>Degradation Trends: {batteryData.degradation}</p>
                    <h2>Recommendations</h2>
                    <p>{recommendations}</p>
                </div>
            )}
        </div>
    );
};

export default BatteryHealth; 
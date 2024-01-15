// PieChart.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';

const PieChartComponent = () => {
  const [sentimentPercentage, setSentimentPercentage] = useState({ positive: 0, negative: 0, neutral: 0 });
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://snakeback-qzk7.onrender.com/sentimentPercentage');
        setSentimentPercentage(response.data);
      } catch (error) {
        console.error('Error fetching sentiment data:', error);
      }
    };

    const updateLocalTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleString());
    };

    fetchData();
    updateLocalTime();

    const intervalId = setInterval(updateLocalTime, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  const data = [
    { title: 'Positive', value: parseFloat(sentimentPercentage.positive), color: '#7FFFD4' },
    { title: 'Negative', value: parseFloat(sentimentPercentage.negative), color: '#f88379' },
    { title: 'Neutral', value: parseFloat(sentimentPercentage.neutral), color: '#7CB9E8' },
  ];

  return (
    <div>
      <p>{`Last Update: ${localTime}`}</p>
      <PieChart
        data={data}
        label={({ dataEntry }) => `${dataEntry.title} (${dataEntry.percentage.toFixed(2)}%)`}
        labelStyle={{ fontSize: '3px', fill: 'white' }}
        segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      />
    </div>
  );
};

export default PieChartComponent;

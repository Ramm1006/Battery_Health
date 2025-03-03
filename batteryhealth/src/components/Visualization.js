import React from "react";
import { Bar } from "react-chartjs-2";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./Visualization.css"; // Import the CSS file for styling

const Visualization = () => {
  const location = useLocation(); // Get the location object
  const { chartData } = location.state || {}; // Get chartData from location state

  return (
    <div className="visualization-container">
      <h1>Model Performance Metrics</h1>
      {chartData ? (
        <Bar data={chartData} options={{ responsive: true }} />
      ) : (
        <p>No data available. Please upload a file first.</p>
      )}
    </div>
  );
};

export default Visualization;

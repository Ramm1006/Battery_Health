import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Change useHistory to useNavigate
import "./BatteryHealth.css"; // Import the CSS file
import { Bar } from "react-chartjs-2"; // Ensure this import is present

const BatteryHealth = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please upload a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/test-accuracy", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Assuming response.data contains the necessary metrics for the chart
      const { accuracy, usage, lifespan, degradation } = response.data;
      setChartData({
        labels: [
          "Accuracy",
          "Battery Usage",
          "Remaining Lifespan",
          "Degradation",
        ],
        datasets: [
          {
            label: "Performance Metrics",
            data: [accuracy, usage, lifespan, degradation],
            backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#F44336"],
          },
        ],
      });
      // Navigate to the visualization page
      navigate("/visualization", { state: { chartData } });
    } catch (err) {
      setError("Error testing accuracy. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="battery-health-container">
      <h1>Battery Health Status</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="input-container">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Upload and Test Accuracy
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {chartData && (
        <div className="chart-container">
          <h2>Model Performance Metrics</h2>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>
      )}
    </div>
  );
};

export default BatteryHealth;

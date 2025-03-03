import React, { useState } from "react";
import Papa from "papaparse"; // Library to parse CSV files
import "./UploadCSV.css"; // Import CSS for styling

const UploadCSV = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setData(results.data);
          setError("");
        },
        error: (err) => {
          setError("Error parsing CSV file.");
          console.error(err);
        },
      });
    }
  };

  return (
    <div className="upload-csv-container">
      <h1>Upload CSV File</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      {error && <div className="error">{error}</div>}
      {data.length > 0 && (
        <div className="data-display">
          <h2>Uploaded Data</h2>
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UploadCSV; 
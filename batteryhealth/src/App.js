import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BatteryHealth from "./components/BatteryHealth";
import Visualization from "./components/Visualization";
import UploadCSV from "./components/UploadCSV";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BatteryHealth />} />
        <Route path="/visualization" element={<Visualization />} />
        <Route path="/upload" element={<UploadCSV />} />
      </Routes>
    </Router>
  );
};

export default App;

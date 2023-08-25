import React from "react";
import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default App;

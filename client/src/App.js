import React from "react";
import { Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
import Dashboard from "./components/Dashboard";
import "./App.css";
import SignUp from "./components/Signup";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;

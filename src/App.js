import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BrowseCoins from "./pages/BrowseCoins";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

function App() {
  return (
    <div className="app">
      <BrowseCoins />
    </div>
  );
}

export default App;

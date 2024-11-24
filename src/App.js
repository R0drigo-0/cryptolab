import "bootstrap/dist/css/bootstrap.min.css";  

import React from "react";
import ErrorView from "./views/ErrorView";
import HomePageView from "./views/HomePageView";
import OpenDesignView from "./views/OpenDesignView";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageView />} />
        <Route path="/cryptolab" element={<HomePageView />} />
        <Route path="/design" element={<OpenDesignView />} />
        <Route path="*" element={<ErrorView />} />
      </Routes>
    </Router>
  );
}

export default App;

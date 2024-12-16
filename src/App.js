import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";  

import React from "react";
import ErrorView from "./views/ErrorView";
import HomePageView from "./views/HomePageView";
import OpenDesignView from "./views/OpenDesignView";

import { BrowserRouter as Router, Route, Routes, HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePageView />} />
        <Route path="/design" element={<OpenDesignView />} />
        <Route path="*" element={<ErrorView />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </HashRouter>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes, HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePageView from "./views/HomePageView";
import OpenDesignView from "./views/OpenDesignView";
import CloseDesignView from "./views/CloseDesignView";
import OptionRouting from "./views/OptionRouting";
import ErrorView from "./views/ErrorView";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePageView />} />
        <Route path="/design" element={<OpenDesignView />} />
        <Route path="/options" element={<CloseDesignView />} />
        <Route path="/options/:option" element={<OptionRouting />} />
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
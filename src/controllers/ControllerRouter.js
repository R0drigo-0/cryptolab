// src/routes/Router.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePageView from '../views/HomePageView';
import OpenDesign from '../views/OpenDesign';
import ErrorView from '../views/ErrorView';

const ControllerRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageView />} />
        <Route path="/design" element={<OpenDesign />} />
        <Route path="/error" element={<ErrorView />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ControllerRouter;
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorView = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Error</h1>
      <p>Something went wrong!</p>
      <button onClick={() => navigate('/')}>
        Try Again
      </button>
    </div>
  );
};

export default ErrorView;
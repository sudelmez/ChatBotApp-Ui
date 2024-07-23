import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AppRoutes from './routes/AppRoutes';


function App() {
  return (
    <Routes>
      {AppRoutes.map((route, index) => {
        const { element, ...rest } = route;
        return <Route key={index} {...rest} element={element} />;
      })}
    </Routes>
  );
}

export default App;

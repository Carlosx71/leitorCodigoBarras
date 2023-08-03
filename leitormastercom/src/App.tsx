import React from 'react';
import BarcodeScanner from './components/BarcodeScanner';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/:id" element={<BarcodeScanner />} />
      </Routes>
    </div>
  );
};

export default App;

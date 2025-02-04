import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/index';
import ResultPage from './Pages/Result';

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/result' element={<ResultPage />}/>
      </Routes>
    </Router>
  );
};

export default Main;

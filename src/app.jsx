import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowList from './Pages/ShowList';
import Add from './Pages/Add';
import Update from './Pages/Update';
import Detail from './Pages/Detail';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

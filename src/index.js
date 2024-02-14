import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './components/pages/Home';
import Jajan from './components/pages/Jajan';
import Po from './components/pages/Po';
import Index from './components/pages/admin/index';
import Login from './components/pages/admin/Login';
import DataBarang from './components/pages/admin/DataBarang';
import DataTransaksi from './components/pages/admin/DataTransaksi';
import NotFound from './components/pages/notFound';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/jajan" element={<Jajan />} />
      <Route path="/po" element={<Po />} />
      <Route path='/admin/login' element={<Login />} />
      <Route path='/admin' element={<Index />} />
      <Route path='/admin/data-barang' element={<DataBarang />} />
      <Route path='/admin/data-transaksi' element={<DataTransaksi />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </React.StrictMode>
  </Router>
);

reportWebVitals();

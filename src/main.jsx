import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter, Routes, Route } from 'react-router-dom';
import Assignment_1 from './assignments/Assignment_1.jsx';
import Assignment_2 from './assignments/Assignment_2.jsx';
import Assignment_3 from './assignments/Assignment_3.jsx';
import { Navigate } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/ASG-01" />} />
      <Route path="/ASG-01" element={<Assignment_1 />} />
      <Route path="/ASG-02" element={<Assignment_2 />} />
      <Route path="/ASG-03" element={<Assignment_3 />} />


    </Routes>
  </HashRouter>

);

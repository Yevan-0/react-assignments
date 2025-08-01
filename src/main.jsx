import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import Assignment_1 from './assignments/Assignment_1.jsx';
import Assignment_2 from './assignments/Assignment_2.jsx';
import Assignment_3 from './assignments/Assignment_3.jsx';
import Assignment_4 from './assignments/Assignment_4.jsx';
import Assignment_5 from './assignments/Assignment_5.jsx';
import Assignment_6 from './assignments/Assignment_6.jsx';
import { Navigate } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/ASG-01" element={<Assignment_1 />} />
      <Route path="/ASG-02" element={<Assignment_2 />} />
      <Route path="/ASG-03" element={<Assignment_3 />} />
      <Route path="/ASG-04" element={<Assignment_4 />} />
      <Route path="/ASG-05" element={<Assignment_5 />} />
      <Route path="/ASG-06" element={<Assignment_6 />} />
    </Routes>
  </HashRouter>

);

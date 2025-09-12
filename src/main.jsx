import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import Loader from './loader/Loader.jsx';

const Assignment_1 = lazy(() => import('./assignments/Assignment_1.jsx'));
const Assignment_2 = lazy(() => import('./assignments/Assignment_2.jsx'));
const Assignment_3 = lazy(() => import('./assignments/Assignment_3.jsx'));
const Assignment_4 = lazy(() => import('./assignments/Assignment_4.jsx'));
const Assignment_5 = lazy(() => import('./assignments/Assignment_5.jsx'));
const Assignment_6 = lazy(() => import('./assignments/Assignment_6.jsx'));
const Assignment_7 = lazy(() => import('./assignments/Assignment_7.jsx'));
const Assignment_8 = lazy(() => import('./assignments/Assignment_8.jsx'));
const Assignment_9 = lazy(() => import('./assignments/Assignment_9.jsx'));
const Assignment_10 = lazy(() => import('./assignments/Assignment_10.jsx'));
const Assignment_11 = lazy(() => import('./assignments/Assignment_11.jsx'));
const Assignment_12 = lazy(() => import('./assignments/Assignment_12.jsx'));
const Assignment_13 = lazy(() => import('./assignments/Assignment_13.jsx'));
const Assignment_14 = lazy(() => import('./assignments/Assignment_14.jsx'));
const Assignment_15 = lazy(() => import('./assignments/Assignment_15.jsx'));
const Assignment_16 = lazy(() => import('./assignments/Assignment_16.jsx'));
const Assignment_17 = lazy(() => import('./assignments/Assignment_17.jsx'));
const Assignment_18 = lazy(() => import('./assignments/Assignment_18.jsx'));
const Assignment_19 = lazy(() => import('./assignments/Assignment_19.jsx'));
const Assignment_20 = lazy(() => import('./assignments/Assignment_20.jsx'));
const Assignment_21 = lazy(() => import('./assignments/Assignment_21.jsx'));
const Assignment_22 = lazy(() => import('./assignments/Assignment_22.jsx'));
const Assignment_23 = lazy(() => import('./assignments/Assignment_23.jsx'));
const Assignment_24 = lazy(() => import('./assignments/Assignment_24.jsx'));
const Assignment_25 = lazy(() => import('./assignments/Assignment_25.jsx'));
const Assignment_26 = lazy(() => import('./assignments/Assignment_26.jsx'));
const Assignment_27 = lazy(() => import('./assignments/Assignment_27.jsx'));



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/ASG-01" element={<Assignment_1 />} />
          <Route path="/ASG-02" element={<Assignment_2 />} />
          <Route path="/ASG-03" element={<Assignment_3 />} />
          <Route path="/ASG-04" element={<Assignment_4 />} />
          <Route path="/ASG-05" element={<Assignment_5 />} />
          <Route path="/ASG-06" element={<Assignment_6 />} />
          <Route path="/ASG-07" element={<Assignment_7 />} />
          <Route path="/ASG-08" element={<Assignment_8 />} />
          <Route path="/ASG-09" element={<Assignment_9 />} />
          <Route path="/ASG-10" element={<Assignment_10 />} />
          <Route path="/ASG-11" element={<Assignment_11 />} />
          <Route path="/ASG-12" element={<Assignment_12 />} />
          <Route path="/ASG-13" element={<Assignment_13 />} />
          <Route path="/ASG-14" element={<Assignment_14 />} />
          <Route path="/ASG-15" element={<Assignment_15 />} />
          <Route path="/ASG-16" element={<Assignment_16 />} />
          <Route path="/ASG-17" element={<Assignment_17 />} />
          <Route path="/ASG-18" element={<Assignment_18 />} />
          <Route path="/ASG-19" element={<Assignment_19 />} />
          <Route path="/ASG-20" element={<Assignment_20 />} />
          <Route path="/ASG-21" element={<Assignment_21 />} />
          <Route path="/ASG-22" element={<Assignment_22 />} />
          <Route path="/ASG-23" element={<Assignment_23 />} />
          <Route path="/ASG-24" element={<Assignment_24 />} />
          <Route path="/ASG-25" element={<Assignment_25 />} />
          <Route path="/ASG-26" element={<Assignment_26 />} />
          <Route path="/ASG-27" element={<Assignment_27 />} />
        </Routes>
      </Suspense>
    </HashRouter>
  </StrictMode>

);

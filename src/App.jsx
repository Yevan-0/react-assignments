import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Assignment_1 from './assignments/Assignment_1.jsx';
import Assignment_2 from './assignments/Assignment_2.jsx';
import { Link } from 'react-router-dom';


function App() {
  return (
    <>
    <Link to="/ASG-01">Assignment 1</Link>
    <br />
    <Link to="/ASG-02">Assignment 2</Link>
    <br />
    <Link to="/ASG-03">Assignment 3</Link>
    <br />
    <Link to="/ASG-04">Assignment 4</Link>
    <br />
    <Link to="/ASG-05">Assignment 5</Link>
    <br />
    <Link to="/ASG-06">Assignment 6</Link>
    <br />
    <Link to="/ASG-07">Assignment 7</Link>
    <br />
    <Link to="/ASG-08">Assignment 8</Link>
    <br />
    <Link to="/ASG-09">Assignment 9</Link>
    <br />
    <Link to="/ASG-10">Assignment 10</Link>
    <br />
    <Link to="/ASG-11">Assignment 11</Link>
    <br />
    <Link to="/ASG-12">Assignment 12</Link>

    </>
  )
}

export default App;

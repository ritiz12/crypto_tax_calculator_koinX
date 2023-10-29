
//import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Sidebar from './components/sidebar'
import Calculator from './components/calculator'


import './App.css';

function App() {
  return (
    <div>
    <div className='big_cont'>
    <div className="App">
      <Navbar />
       <Sidebar />
         <Calculator/>

    </div>
    </div>

    </div>


  );
}

export default App;

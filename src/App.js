
//import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Sidebar from './components/sidebar'
import Calculator from './components/calculator'
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
       <Sidebar />
         <Calculator/>
    </div>

  );
}

export default App;

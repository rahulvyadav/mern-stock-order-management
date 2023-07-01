import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom"
import NavBar from './Component/NavBar';
import Stock from './Component/Stock';
import Order from './Component/Order';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Stock />} />
          <Route path='/order' element={<Order />} />

        </Routes>
      </BrowserRouter>
    </>

  );
}

export default App;

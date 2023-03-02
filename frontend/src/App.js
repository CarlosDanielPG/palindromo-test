import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';
import Products from './screens/products';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

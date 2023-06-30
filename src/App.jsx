import React from 'react';
import './App.css';
import MainHeader from './common/MainHeader';
import MainNav from './common/MainNav';
import MainFooter from './common/MainFooter';
import Inicio from './pages/Inicio';
import Inversiones from './pages/Inversiones';
import Proveedores from './pages/Proveedores';
import Empleados from './pages/Empleados';
import Tienda from './pages/Tienda';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductoDetalles from './pages/ProductoDetalles';
import Carrito from './pages/Carrito';
import Seleccionados from './pages/Seleccionados';
import Pedidos from './pages/Pedidos';

function App() {
  return (
    <BrowserRouter>
      <MainHeader />
      <MainNav />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inversiones" element={<Inversiones />} />
        <Route path="/proveedores" element={<Proveedores />} />
        <Route path="/empleados" element={<Empleados />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path='/productodetalles/:idproducto' element={<ProductoDetalles />} />
        <Route path='/carrito' element={<Carrito />} />
        <Route path='/seleccionados' element={<Seleccionados />}/>
        <Route path='/pedidos' element={<Pedidos />}/>
      </Routes>

      <MainFooter />
    </BrowserRouter>
  );
}

export default App;

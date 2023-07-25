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
import Directores from './pages/Directores';
import Login from './pages/Login';
import Clientes from './pages/Clientes';
import Consultas from './pages/Consultas';
import ConsultaSeleccionada from './components/ConsultaSeleccionada';

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
        <Route path='/directores' element={<Directores />}></Route>
        <Route path='/login' element={ <Login></Login> }></Route>
        <Route path='/clientes' element={<Clientes />}/>
        <Route path='/consultas' element={<Consultas/>}/>
        <Route path="/consulaseleccionada" element={<ConsultaSeleccionada/>}/>
      </Routes>

      <MainFooter />
    </BrowserRouter>
  );
}

export default App;

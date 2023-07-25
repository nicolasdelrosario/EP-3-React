import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'

function MainNav() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
      <div className="container">
        <Link className="navbar-brand navbar-title" to="/">Tasty Food</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link navbar-title" to="/#nosotros">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navbar-title" to="/#noticias">Noticias</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navbar-title" to="/inversiones">Inversiones</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navbar-title" to="/proveedores">Proveedores</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navbar-title" to="/empleados">Empleados</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navbar-title" to="/tienda">Tienda</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navbar-title" to="/pedidos">Pedidos</Link>
            </li>
            <li className='nav-item'>
              <Link className="nav-link navbar-title" to="/directores">Directores</Link>
            </li>
            <li className='nav-item'>
              <Link className="nav-link navbar-title" to="/clientes">Clientes</Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link navbar-title' to="/consultas">Consultas</Link>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className='nav-item'>
              <Link className='nav-link navbar-title' to="/seleccionados">Seleccionados</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navbar-title" to="/carrito">
                <i className='bi bi-basket-fill' title='Carrito de compras'/> Carrito
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link navbar-title" to="/login">
                <i className='bi bi-person-fill' title='Iniciar Sesión'/> Login
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MainNav;

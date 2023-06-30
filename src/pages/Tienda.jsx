import React, { useState, useEffect } from 'react';
import Productos from '../components/Productos';

function Tienda() {
  const [listaCategorias, setListaCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio = 'https://servicios.campus.pe/categorias.php';
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => { setListaCategorias(data); });
  };

  const seleccionarCategoria = (event, item) => {
    setCategoriaSeleccionada(item)
    
    let itemsLista = document.querySelectorAll("#lista-categorias li")
    itemsLista.forEach(item=> {
      item.classList.remove("active")
    })

    event.currentTarget.classList.add("active");
  }

  const dibujarLista = () => {
    return (
      <ul id="lista-categorias" className="list-group">
        {listaCategorias.map(item =>
          <li className="list-group-item" key={item.idcategoria} title={item.descripcion}
          onClick={(event) => seleccionarCategoria(event, item)}>
            { item.nombre }
          </li>
        )}
      </ul>
    );
  };

  return (
    <section className="padded">
      <div className="container">
        <h2>Tienda</h2>
        <div className="row">
          <div className="col-xl-2 col-md-3">
            { dibujarLista() }
          </div>
          <div className="col-xl-10 col-md-9">
            <h3>{ categoriaSeleccionada.nombre }</h3>
            <small>{ categoriaSeleccionada.descripcion }</small>
            <Productos categoriaProductos = {categoriaSeleccionada.idcategoria}/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Tienda;

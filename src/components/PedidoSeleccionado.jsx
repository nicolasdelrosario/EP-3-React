import React, { useState, useEffect } from 'react';
import './PedidoSeleccionado.css';

const PedidoSeleccionado = (props) => {
  const [listaPedidos, setListaPedidos] = useState([]);

  useEffect(() => {
    leerServicio(props.pedidos);
  }, [props.pedidos]);

  const leerServicio = async (idpedido) => {
    const rutaServicio = "https://servicios.campus.pe/pedidosdetalle.php?idpedido=" + idpedido;
    try {
      const response = await fetch(rutaServicio);
      const data = await response.json();
      setListaPedidos(data);
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
    }
  }

  const dibujarCuadricula = () => {
    if (listaPedidos === null) {
      return <p>Cargando pedidos...</p>; // Mostrar mensaje de carga mientras se obtiene la lista de pedidos
    }

    return (
      <div className='row row-cols-xxl-4 row-cols-xl-4 row-cols-lg-3 row-cols-2 g-4 sticky-top pt-5'>
        {listaPedidos.map((item) => (
          <div className="col" key={item.imagenchica}>
            <div className="card h-100 p-2 cardPedido">
              <figure className='image-content'>
                <img
                  src={
                    item.imagenchica == null
                      ? "https://via.placeholder.com/150" // Placeholder de imagen
                      : "https://servicios.campus.pe/" + item.imagenchica
                  }
                  className="card-img-top"
                  alt="..."
                />
              </figure>
              
              <div className='card-body'>
                  <h5>{ item.nombre }</h5>
                  <p>Precio: S/{ parseFloat(item.precio).toFixed(2) }</p>
                  <p>Cantidad: { item.cantidad }</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return <>{dibujarCuadricula()}</>;
}

export default PedidoSeleccionado;

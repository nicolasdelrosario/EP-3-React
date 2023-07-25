import React, { useState, useEffect } from 'react';

const ConsultaSeleccionada = ({ idconsulta }) => {
  const [listaConsultas, setListaConsultas] = useState([]);

  const leerServicio = async (idconsulta) => {
    const rutaServicio = "https://servicios.campus.pe/pedidosdetalle.php?idpedido=" + idconsulta;
    try {
      const response = await fetch(rutaServicio);
      const data = await response.json();
      setListaConsultas(data);
    } catch (error) {
      console.error('Error al obtener los pedidos:', error);
    }
  };

  const dibujarCuadricula = (listaConsultas) => {
    return (
      <div className='row row-cols-xxl-4 row-cols-xl-4 row-cols-lg-3 row-cols-2 g-4 sticky-top pt-5'>
        {listaConsultas.map((item) => (
          <div className="col" key={item.imagenchica}>
            <div className="card h-100 p-2 cardPedido">
              <figure className='image-content'>
                <img
                  src={
                    item.imagenchica == null
                      ? "https://via.placeholder.com/150"
                      : "https://servicios.campus.pe/" + item.imagenchica
                  }
                  className="card-img-top"
                  alt="..."
                />
              </figure>

              <div className='card-body'>
                <h5>{item.nombre}</h5>
                <p>Precio: S/{parseFloat(item.precio).toFixed(2)}</p>
                <p>Cantidad: {item.cantidad}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Call the leerServicio function to fetch data on component mount
  React.useEffect(() => {
    leerServicio(idconsulta);
  }, [idconsulta]);

  return <>{dibujarCuadricula(listaConsultas)}</>;
};

export default ConsultaSeleccionada;
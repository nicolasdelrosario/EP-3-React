import React, { useEffect, useState } from 'react'
import noImage from '../assets/img/no-image.svg'
import './Empleados.css'
import '../index.css'
import { seleccionarEmpleado } from '../utils'

function Empleados() {
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [itemEmpleado, setItemEmpleado] = useState(null);

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio = "https://servicios.campus.pe/empleados.php";
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        setListaEmpleados(data);
      });
  };

  const mostrarDatosModal = (idempleado) => {
    const empleadoDeseado = listaEmpleados.find((empleado) => empleado.idempleado === idempleado);
    if (empleadoDeseado) {
      setItemEmpleado(empleadoDeseado);
    }
  };

  const dibujarCuadricula = () => (
    <div className='row row-cols-xl-4 row-cols-lg-3 row-cols-2 g-4'>
      {listaEmpleados.map((item) => (
        <div className="col" key={item.idempleado}>
          <div className="card h-100">
            <figure className='position-relative verMasFigure'>
              <img src={"https://servicios.campus.pe/fotos/" + item.foto} className="card-img-top" alt="..." />
              <div className='verMas' data-bs-toggle="modal" data-bs-target="#empleadoModal" onClick={() => mostrarDatosModal(item.idempleado)}>
                <p className='text-center'>Ver más</p>
              </div>
            </figure>
            <div className="card-body">
              <h5 className="card-title">{item.cargo}</h5>
              <p className="card-text">{item.nombres} {item.apellidos}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const dibujarModal = () => {
    if (itemEmpleado) {
      return (
        <div className="modal fade" id="empleadoModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">{itemEmpleado.nombres + itemEmpleado.apellidos}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className='row'>
                  <div className='col-md-6'>
                    <img src={itemEmpleado.foto == null
                      ? noImage
                      : "https://servicios.campus.pe/fotos/" + itemEmpleado.foto
                    } className="img-fluid" alt="..." />
                  </div>
                  <div className='col-md-6'>
                    <p className='pb-3'>Cargo: { itemEmpleado.cargo }</p>
                    <p className='pb-3'>Pais: { itemEmpleado.pais }</p>
                    <p className='pb-3'>Ciudad: { itemEmpleado.ciudad }</p>
                    <p className='pb-3'>Telefono: { itemEmpleado.telefono }</p>
                  </div>
                </div>
              </div>


              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => seleccionarEmpleado(itemEmpleado)}>Seleccionar Empleado</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="padded">
      <div className="container">
        <h2 className='pb-4'>Empleados</h2>
        {dibujarCuadricula()}
        {dibujarModal()}
      </div>
    </section>
  );
}

export default Empleados;

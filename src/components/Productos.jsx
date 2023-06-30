import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Productos.css'
import noImage from '../assets/img/no-image.svg'
import { agregarCarrito } from '../utils'

const Productos = (props) => {
  const [listaProductos, setListaProductos] = useState([]);
  const [itemProducto, setItemProducto] = useState([]);

  useEffect(() => {
    leerServicio(props.categoriaProductos);
  }, [props.categoriaProductos])

  const leerServicio = (idcategoria) => {
    const rutaServicio = "https://servicios.campus.pe/productos.php?idcategoria=" + idcategoria;
    fetch(rutaServicio)
      .then(response => response.json())
      .then(data => {
        setListaProductos(data);
      })
  }

  const dibujarCuadricula = () => (
    <div className='row row-cols-xxl-5  row-cols-xl-4  row-cols-lg-3 row-cols-2 g-4'>

      {listaProductos.map((item) =>
        <div className="col" key={item.idproducto}>
          <div className="card h-100">
            <figure className='image-content'>

              <Link to={"/productodetalles/" + item.idproducto}>
                <img src={item.imagenchica == null
                  ? noImage
                  : "https://servicios.campus.pe/" + item.imagenchica
                } className="card-img-top" alt="..." />
              </Link>


              {item.preciorebajado !== "0"
                ? <div className='porcentaje-rebajado'> {((1 - parseFloat(item.preciorebajado) / parseFloat(item.precio)) * 100).toFixed(2)}%</div>
                : ""}

              <div className='vista-rapida' data-bs-toggle="modal" data-bs-target="#vistaRapidaModal" onClick={() => mostrarDatosVistaRapida(item.idproducto)}>
                <i className='bi bi-eye'></i>
              </div>
            </figure>

            <div className="card-body">
              <h5 className="card-title">{item.nombre}</h5>
              <p className="card-text">S/ {item.preciorebajado === "0"
                ? parseFloat(item.precio).toFixed(2)
                : parseFloat(item.preciorebajado).toFixed(2)}

                <span className='precio-lista'>
                  {item.preciorebajado !== "0"
                    ? "(S/ " + parseFloat(item.precio).toFixed(2) + ")"
                    : ""}
                </span>
                <i className='bi bi-basket-fill btnCarrito' title='Añadir al carrito' onClick={() => agregarCarrito(item)}></i>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const mostrarDatosVistaRapida = (idproducto) => {
    const rutaServicio = "https://servicios.campus.pe/productos.php?idproducto=" + idproducto;
    fetch(rutaServicio)
      .then(response => response.json())
      .then(data => {
        setItemProducto(data[0]);
      })
  }

  const dibujarVistaRapida = () => {
    return (
      // < !--Modal -- >
      <div className="modal fade" id="vistaRapidaModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{itemProducto.nombre}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='row'>
                <div className='col-md-6'>
                  <img src={itemProducto.imagengrande == null
                    ? noImage
                    : "https://servicios.campus.pe/" + itemProducto.imagengrande
                  } className="img-fluid" alt="..." />
                </div>
                <div className='col-md-6'>
                  <table className='table'>
                    <tbody>
                      <tr><th>Detalle</th><td>{itemProducto.detalle}</td></tr>
                      <tr><th>Precio</th><td>S/ {itemProducto.preciorebajado === "0"
                        ? parseFloat(itemProducto.precio).toFixed(2)
                        : parseFloat(itemProducto.preciorebajado).toFixed(2)}

                        <span className='precio-lista'>
                          {itemProducto.preciorebajado !== "0"
                            ? "(S/ " + parseFloat(itemProducto.precio).toFixed(2) + ")"
                            : ""}
                        </span></td></tr>
                      <tr><th>Categoria</th><td>{itemProducto.categoria}</td></tr>
                      <tr><th>Proveedor</th><td>{itemProducto.proveedor}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => agregarCarrito(itemProducto)}>Añadir al carrito</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {dibujarCuadricula()}
      {dibujarVistaRapida()}
    </>
  )
}

export default Productos
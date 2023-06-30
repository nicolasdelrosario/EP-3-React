import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import noImage from '../assets/img/no-image.svg'
import { agregarCarrito } from '../utils';

const ProductoDetalles = () => {
  const [itemProducto, setItemProducto] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  let params = useParams();
  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio = "https://servicios.campus.pe/productos.php?idproducto=" + params.idproducto;
    fetch(rutaServicio)
      .then(response => response.json())
      .then(data => {
        setItemProducto(data[0]);
      })
  }

  return (
    <section className='padded'>
      <div className="container">
        <h1>{itemProducto.nombre}</h1>
        <div className="row">
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
                <tr><th>Stock</th><td>{itemProducto.unidadesenexistencia}</td></tr>
                <tr><th>Categoria</th><td>{itemProducto.categoria}</td></tr>
                <tr><th>Proveedor</th><td>{itemProducto.proveedor}</td></tr>

                <tr><th>País</th><td>{itemProducto.pais}</td></tr>
                <tr><th>Atención al Cliente</th><td>{itemProducto.telefono}</td></tr>
              </tbody>
            </table>
            <div className="row g-3 mb-3">
              <div className="col-auto">
                <label className="col-form-label">Cantidad</label>
              </div>
              <div className="col-auto">
                <input className='form-control' type="number" placeholder='Cantidad' min="1" value={cantidad} onChange={(event) => setCantidad(event.target.value)}/>
              </div>
              <div className="col-auto">
                <button className='btn btn-primary' onClick={() => agregarCarrito(itemProducto, cantidad)}>Agregar al carrito</button>
              </div>
            </div>

            <h3>Descripción</h3>
            <div dangerouslySetInnerHTML={{__html: itemProducto.descripcion}}></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductoDetalles;
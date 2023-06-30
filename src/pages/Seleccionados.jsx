import { useState, useEffect } from 'react'

const Seleccionados = () => {
  const [itemsCarrito, setItemsCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    leerDatosCarritoEmpleados()
  }, []);

  const leerDatosCarritoEmpleados = async () => {
    let datosCarrito = await JSON.parse(sessionStorage.getItem("empleadoseleccionado"));
    setItemsCarrito(datosCarrito)
    if (datosCarrito !== null) {
      calcularTotal(datosCarrito);
    }
  }

  const calcularTotal = (datosCarrito) => {
    let suma = datosCarrito.reduce((acumular, fila) => acumular + fila["precio"] * fila["cantidad"], 0)
    setTotal(suma)
  }

  const dibujarTabla = () => {
    return (
      <table className="table">
        <thead>
          <tr className="text-center">
            <th>Código</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cargo</th>
            <th>Pais</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {itemsCarrito === null
            ? "<></>"
            : itemsCarrito.map((item, index) =>
              <tr key={item.idempleado}>
                <td>{item.idempleado}</td>
                <td>{item.nombres}</td>
                <td>{item.apellidos}</td>
                <td>{item.cargo}</td>
                <td>{item.pais}</td>
                <td><i className="bi bi-x-lg botonEliminar" title="Eliminar" onClick={() => eliminarItem(item)}></i></td>
              </tr>
            )}
        </tbody>
      </table>

    )
  }

  const eliminarItem = (item) => {
    let carritoMenos = itemsCarrito.filter(itemCarrito => itemCarrito.idempleado !== item.idempleado);
    setItemsCarrito(carritoMenos)
    sessionStorage.setItem("empleadoseleccionado", JSON.stringify(carritoMenos));
    calcularTotal(carritoMenos)
  }

  const vaciarCarrito = () => {
    sessionStorage.removeItem("empleadoseleccionado")
    setItemsCarrito([])
    setTotal(0)
  }


  return (
    <section className='padded'>
      <div className="container">
        <h1>Empleados Seleccionados</h1>
        <div className="row">
          <div className="col-md-10">
            {dibujarTabla()}
          </div>
          <div className="col-md-2">
            <button className="btn btn-danger" onClick={() => vaciarCarrito()}>Vaciar Carrito</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Seleccionados
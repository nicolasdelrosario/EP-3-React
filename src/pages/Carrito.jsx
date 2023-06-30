import { useState, useEffect } from "react";

const Carrito = () => {
  const [itemsCarrito, setItemsCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    leerDatosCarrito()
  }, []);

  const leerDatosCarrito = async () => {
    let datosCarrito = await JSON.parse(sessionStorage.getItem("carritocompras"));
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
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {itemsCarrito === null
            ? "<></>"
            : itemsCarrito.map((item, index) =>
              <tr key={item.idproducto}>
                <td>{item.idproducto}</td>
                <td>{item.nombre}</td>
                <td>{Number(item.precio).toFixed(2)}</td>
                <td>                                                                                                                  
                  <input type="number" value={item.cantidad} className="form-control cantidad-carrito text-end" min="0"
                    onChange={(event) => actualizarCantidad(event.target.value, index)} />
                </td>
                <td>{Number(item.precio * item.cantidad).toFixed(2)}</td>
                <td><i className="bi bi-x-lg botonEliminar" title="Eliminar" onClick={() => eliminarItem(item)}></i></td>
              </tr>
            )}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="4" className="text-end">Total</th>
            <th className="text-center">{Number(total).toFixed(2)}</th>
          </tr>
        </tfoot>
      </table>
    )
  }

  const actualizarCantidad = (cantidad, index) => {
    let carritoCantidad = [...itemsCarrito]
    carritoCantidad[index].cantidad = cantidad
    setItemsCarrito(carritoCantidad)
    calcularTotal(carritoCantidad)
    sessionStorage.setItem("carritocompras", JSON.stringify(carritoCantidad));
  }

  const eliminarItem = (item) => {
    let carritoMenos = itemsCarrito.filter(itemCarrito => itemCarrito.idproducto !== item.idproducto);
    setItemsCarrito(carritoMenos)
    sessionStorage.setItem("carritocompras", JSON.stringify(carritoMenos));
    calcularTotal(carritoMenos)
  }

  const vaciarCarrito = () => {
    sessionStorage.removeItem("carritocompras")
    setItemsCarrito([])
    setTotal(0)
  }

  return (
    <section className="padded">
      <div className="container">
        <h1>Carrito de compras</h1>
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

export default Carrito;
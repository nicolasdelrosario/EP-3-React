import { useState, useEffect } from "react";
import PedidoSeleccionado from "../components/PedidoSeleccionado";

const Pedidos = () => {
  const [listaPedidos, setListaPedidos] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState([])

  useEffect(() => {
    leerServicio();
  }, []);

  const leerServicio = () => {
    const rutaServicio = "https://servicios.campus.pe/pedidos.php"
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => { setListaPedidos(data); });
  };

  const seleccionarPedido = (event, item) => {
    setPedidoSeleccionado(item)

    let itemsLista = document.querySelectorAll("#lista-pedidos li")
    itemsLista.forEach(item => {
      item.classList.remove("active")
    })

    event.currentTarget.classList.add("active");
  }

  const dibujarLista = () => {
    return (
      <ul id="lista-pedidos" className="list-group">
        {listaPedidos.map(item =>
          <li className="list-group-item" key={item.idpedido} title={item.nombres}
            onClick={(event) => seleccionarPedido(event, item)}>
            {item.nombres}
          </li>
        )}
      </ul>
    );
  };

  return (
    <section className='padded'>
      <div className="container">
        <h2>Pedidos</h2>
        <div className="row">
          <div className="col-xl-2 col-md-3">
            {dibujarLista()}
          </div>
          <div className="col-xl-10 col-md-9">
            <h3>Código: {pedidoSeleccionado.idpedido}</h3>
            <PedidoSeleccionado pedidos={pedidoSeleccionado.idpedido} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Pedidos
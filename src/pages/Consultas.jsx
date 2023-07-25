import React, { useState, useEffect } from 'react';
import './Pedidos.css'
import ConsultaSeleccionada from '../components/ConsultaSeleccionada';

function Consultas() {
  const [listaPedidos, setListaPedidos] = useState([]);
  const [listaPedidosFiltrado, setListaPedidosFiltrado] = useState([]);
  const [ascendente, setAscendente] = useState(1);
  const [columnaAnterior, setColumnaAnterior] = useState("usuario");
  const [textoBuscar, setTextoBuscar] = useState("");
  const [pagina, setPagina] = useState(0);
  const [filasPagina, setFilasPagina] = useState(10);
  const [numPaginas, setNumPaginas] = useState(0);

  const [idConsultaSeleccionada, setIdConsultaSeleccionada] = useState(null);


  useEffect(() => leerServicio(), []);

  const leerServicio = () => {
    const root = 'https://servicios.campus.pe/pedidos.php';
    fetch(root)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setListaPedidos(data);
          setListaPedidosFiltrado(data);
          setNumPaginas(Math.ceil(data.length / filasPagina));
        } else {
          console.error('Invalid data format received from the API.');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const dibujarTabla = () => (
    <table className="table">
      <thead>
        <tr>
          <th columna="idcliente" onClick={(event) => seleccionarColumna(event)}>Código</th>
          <th columna="fechapedido" onClick={(event) => seleccionarColumna(event)}>Fecha del Pedido</th>
          <th columna="usuario" onClick={(event) => seleccionarColumna(event)}>Usuario</th>
          <th columna="nombre" onClick={(event) => seleccionarColumna(event)}>Nombre</th>
          <th columna="total" onClick={(event) => seleccionarColumna(event)}>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {listaPedidosFiltrado.slice(pagina * filasPagina, (pagina + 1) * filasPagina).map((item) => (
          <tr key={item.idpedido}>
            <td>{item.idpedido}</td>
            <td>{item.fechapedido}</td>
            <td>{item.usuario}</td>
            <td>{item.nombres}</td>
            <td>{item.total}</td>
            <td>
              <i
                className="bi bi-check-circle-fill"
                onClick={() => {
                  setIdConsultaSeleccionada(item.idpedido);
                  console.log(setIdConsultaSeleccionada)
                }}
              ></i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );



  const bootstrapNavigation = () => (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous" onClick={() => retroceder()}>
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li className="page-item"><a className="page-link" href="#" onClick={() => seleccionarPagina(0)}>1</a></li>
        <li className="page-item"><a className="page-link" href="#" onClick={() => seleccionarPagina(1)}>2</a></li>
        <li className="page-item"><a className="page-link" href="#" onClick={() => seleccionarPagina(2)}>3</a></li>
        <li className="page-item"><a className="page-link" href="#" onClick={() => seleccionarPagina(3)}>4</a></li>
        <li className="page-item"><a className="page-link" href="#" onClick={() => seleccionarPagina(4)}>5</a></li>
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next" onClick={() => avanzar()}>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );

  const seleccionarColumna = (event) => {
    let columnaSeleccionada = event.target.getAttribute("columna");
    let ascendentex = ascendente
    if (columnaAnterior == columnaSeleccionada) {
      ascendentex = -ascendentex
    } else {
      ascendentex = 1
    }
    setAscendente(ascendentex)
    setColumnaAnterior(columnaSeleccionada);

    setListaPedidosFiltrado([...listaPedidosFiltrado].sort((a, b) => {
      const codigoMenor = "return a." + columnaSeleccionada + "< b." + columnaSeleccionada + "? true : false";
      const funcionMenor = new Function('a', 'b', codigoMenor);
      if (funcionMenor(a, b)) {
        return -ascendente;
      }

      const codigoMayor = "return a." + columnaSeleccionada + "> b." + columnaSeleccionada + "? true : false";
      const funcionMayor = new Function('a', 'b', codigoMayor);
      if (funcionMayor(a, b)) {
        return ascendente;
      }

      return 0;
    }))
  }

  const buscarTexto = (event) => {
    let textoB = event.target.value;
    setTextoBuscar(textoB);

    const resultado = listaPedidos.filter((item) =>
      item[columnaAnterior].toUpperCase().includes(textoB.toUpperCase())
    );
    setListaPedidosFiltrado(resultado);
  };

  const avanzar = () => {
    if (pagina < numPaginas - 1) {
      setPagina(pagina + 1);
    }
  }

  const retroceder = () => {
    if (pagina > 0) {
      setPagina(pagina - 1);
    }
  }

  const seleccionarPagina = (pagina) => {
    setPagina(pagina)
  }

  return (
    <section className="padded">
      <div className="container">
        <h2>Clientes</h2>
        <div className="mb-3">
          <input type="text" value={textoBuscar} onChange={(event) => buscarTexto(event)}
            className='form-control' placeholder='Indique expresión a buscar' />
        </div>
        {dibujarTabla()}


        {bootstrapNavigation()}

        {idConsultaSeleccionada && <ConsultaSeleccionada idconsulta={idConsultaSeleccionada} />}

        <div> {(pagina + 1) + " de " + numPaginas} </div>
      </div>
    </section>
  );
}

export default Consultas;

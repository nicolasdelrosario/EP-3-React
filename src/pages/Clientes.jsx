import React, { useState, useEffect } from 'react';

function Clientes() {
  const [listaClientes, setListaClientes] = useState([]);
  const [listaClientesFiltrado, setListaClientesFiltrado] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [ascendente, setAscendente] = useState(1);
  const [columnaAnterior, setColumnaAnterior] = useState("nombreempresa");
  const [textoBuscar, setTextoBuscar] = useState("");
  const [pagina, setPagina] = useState(0);
  const [filasPagina, setFilasPagina] = useState(10);
  const [numPaginas, setNumPaginas] = useState(0);


  useEffect(() => leerServicio(), []);

  const leerServicio = () => {
    const root = 'https://servicios.campus.pe/proveedores.php';
    fetch(root)
      .then((response) => response.json())
      .then((data) => {
        setListaClientes(data);
        setListaClientesFiltrado(data)
        setCargando(false)
        setNumPaginas(Math.ceil(data.length / filasPagina))
      });
  };

  const dibujarTabla = () => (
    <table className="table">
      <thead>
        <tr>
          <th columna="idproveedor" onClick={(event) => seleccionarColumna(event)}>Código</th>
          <th columna="nombreempresa" onClick={(event) => seleccionarColumna(event)}>Empresa</th>
          <th columna="nombrecontacto" onClick={(event) => seleccionarColumna(event)}>Contacto</th>
          <th columna="cargocontacto" onClick={(event) => seleccionarColumna(event)}>Cargo</th>
          <th columna="ciudad" onClick={(event) => seleccionarColumna(event)}>Ciudad</th>
        </tr>
      </thead>
      <tbody>
        {listaClientesFiltrado.slice(pagina * filasPagina, (pagina + 1) * filasPagina).map((item) => (
          <tr key={item.idproveedor}>
            <td>{item.idproveedor}</td>
            <td>{item.nombreempresa}</td>
            <td>{item.nombrecontacto}</td>
            <td>{item.cargocontacto}</td>
            <td>{item.ciudad}</td>
          </tr>
        ))}
      </tbody>
    </table>
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

    setListaClientesFiltrado([...listaClientesFiltrado].sort((a, b) => {
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

  const buscarTexto = event => {
    let textoB = event.target.value;
    setTextoBuscar(textoB);

    const resutado = listaClientes.filter((item) =>
      (item[columnaAnterior].toUpperCase()).includes(textoB.toUpperCase()));
    setListaClientesFiltrado(resutado)
  }

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

  return (
    <section className="padded">
      <div className="container">
        <h2>Clientes</h2>
        <div className="mb-3">
          <input type="text" value={textoBuscar} onChange={(event) => buscarTexto(event)}
            className='form-control' placeholder='Indique expresión a buscar' />
        </div>
        {cargando === true
          ? <div className="lds-heart"><div></div></div>
          : dibujarTabla()
        }

        <div> {(pagina + 1) + " de " + numPaginas} </div>
        <button className="btn btn-primary" onClick={() => retroceder()}>Retroceder</button>
        <button className="btn btn-primary" onClick={() => avanzar()}>Avanzar</button>
      </div>
    </section>
  );
}

export default Clientes;

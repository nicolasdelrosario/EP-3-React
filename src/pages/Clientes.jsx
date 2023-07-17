import React, { useState, useEffect } from 'react';
import './Clientes.css'

function Clientes() {
  const [listaClientes, setListaClientes] = useState([]);
  const [listaClientesFiltrado, setListaClientesFiltrado] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [ascendente, setAscendente] = useState(1);
  const [columnaAnterior, setColumnaAnterior] = useState("empresa");
  const [textoBuscar, setTextoBuscar] = useState("");
  const [pagina, setPagina] = useState(0);
  const [filasPagina, setFilasPagina] = useState(20);
  const [numPaginas, setNumPaginas] = useState(0);


  useEffect(() => leerServicio(), []);

  const leerServicio = () => {
    const root = 'https://servicios.campus.pe/servicioclientes.php';
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
          <th columna="idcliente" onClick={(event) => seleccionarColumna(event)}>Código</th>
          <th columna="nombres" onClick={(event) => seleccionarColumna(event)}>Nombres</th>
          <th columna="empresa" onClick={(event) => seleccionarColumna(event)}>Nombre Empresa</th>
          <th columna="cargo" onClick={(event) => seleccionarColumna(event)}>Cargo</th>
          <th columna="ciudad" onClick={(event) => seleccionarColumna(event)}>Ciudad</th>
        </tr>
      </thead>
      <tbody>
        {listaClientesFiltrado.slice(pagina * filasPagina, (pagina + 1) * filasPagina).map((item) => (
          <tr key={item.idcliente}>
            <td>{item.idcliente}</td>
            <td>{item.nombres}</td>
            <td>{item.empresa}</td>
            <td>{item.cargo}</td>
            <td>{item.ciudad}</td>
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
    console.log('potato')
    console.log(event.target.value)
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

  const seleccionarPagina = (pagina) => {
    setPagina(pagina)

    // let itemsLista = document.querySelectorAll(".page-item")
    // itemsLista.forEach(item => {
    //   item.classList.remove("active")
    //   item.currentTarget.classList.add("active");
    // })

    // item.currentTarget.classList.add("active");

//    let columnaSeleccionada = event.target.getAttribute("columna");
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

        { bootstrapNavigation() }

        <div> {(pagina + 1) + " de " + numPaginas} </div>
      </div>
    </section>
  );
}

export default Clientes;

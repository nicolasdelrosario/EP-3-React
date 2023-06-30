import React, { useState, useEffect } from 'react';

function Proveedores() {
  const [listaProveedores, setListaProveedores] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => leerServicio(), []);

  const leerServicio = () => {
    const root = 'https://servicios.campus.pe/proveedores.php';
    fetch(root)
      .then((response) => response.json())
      .then((data) => {
        setListaProveedores(data);
        setCargando(false)
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
        {listaProveedores.map((item) => (
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
    setListaProveedores([...listaProveedores].sort((a, b) => {
      const codigoMenor = "return a." + columnaSeleccionada + "< b." + columnaSeleccionada + "? true : false";
      const funcionMenor = new Function('a', 'b', codigoMenor);
      if(funcionMenor(a,b)) {
        return -1;
      }
      
      const codigoMayor = "return a." + columnaSeleccionada + "> b." + columnaSeleccionada + "? true : false";
      const funcionMayor = new Function('a', 'b', codigoMayor);
      if(funcionMayor(a,b)) {
        return 1;
      }

      return 0;
      
      // if(eval("a." + columnaSeleccionada + "< b." + columnaSeleccionada)) {
      //   return -1;
      // } 
      // if(eval("a." + columnaSeleccionada + "> b." + columnaSeleccionada)) {
      //   return 1;
      // }
      // return 0;
    }))
  }

  return (
    <section className="padded">
      <div className="container">
        <h2>Proveedores</h2>
        {cargando === true
          ? <div className="lds-heart"><div></div></div>
          : dibujarTabla()
        }


      </div>
    </section>
  );
}

export default Proveedores;

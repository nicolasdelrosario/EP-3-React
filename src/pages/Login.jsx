import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()

  const iniciarSesion = async(event) => {
    event.preventDefault();
    const dataForm = new FormData(event.currentTarget);
    
    const rutaServicio = "https://servicios.campus.pe/iniciarsesion.php";
    let formData = new FormData();
    formData.append("usuario", dataForm.get("usuario"));
    formData.append("clave", dataForm.get("clave"));

    const response = await fetch(rutaServicio,{method:"post", body: formData});
    const result = await response.json()
    switch(result) {
      case -1:
        alert("El usuario no está registrado");
        break;
      case -2:
        alert("La contraseña es incorrecta");
        break;
      default:
        alert("Bienvenido");
        navigate("/proovedores", {replace:true});
        break;
    }
  }


  return (
    <section className="padded">
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <form onSubmit={(event) => iniciarSesion(event)}>
              <h2 className="text-center">Inciar Sesión</h2>
              <div className="mb-2">
                <input type="text" className='form-control' placeholder='Usuario' required name="usuario"/>
              </div>
              <div className="mb-2">
                <input type="password" className='form-control' placeholder='Contraseña' required id="txtClave" name="clave"/>
                <input className="form-check-input" type="checkbox" onClick={(event) => {
                  document.getElementById("txtClave").setAttribute("type", event.target.checked ? "text" : "password")
                }}/>
                <label className="form-check-label">&nbsp;Mostrar Contraseña</label>
              </div>
              <div className="mb-2">
                <button type='submit' className='btn btn-primary w-100 btn-block'>Iniciar sesión</button>
              </div>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </section>
  )
}

export default Login
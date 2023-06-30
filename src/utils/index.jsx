export const ApiWebURL = "https://servicios.campu.pe/";

export const agregarCarrito = (item, cantidad) => {
  item.cantidad = cantidad == null ? 1 : cantidad;
  if (item.preciorebajado !== "0") {
    item.precio = item.preciorebajado;
  }
  let carrito = [];
  if(sessionStorage.getItem("carritocompras")) {
    carrito = JSON.parse(sessionStorage.getItem("carritocompras"));


    let index = -1;
    for(let i = 0; i < carrito.length; i++) {
      if(item.idproducto === carrito[i].idproducto) {
        index = i;
        break;
      }
    }
    if(index === -1) {
      carrito.push(item);
      sessionStorage.setItem("carritocompras", JSON.stringify(carrito));   
    }
    else {
      carrito[index].cantidad++;
      sessionStorage.setItem("carritocompras", JSON.stringify(carrito));   
    }
  } 
  else {
    carrito.push(item);
    sessionStorage.setItem("carritocompras", JSON.stringify(carrito));
  }
}

export const seleccionarEmpleado = (item) => {
  let carritoEmpleado = [];
  if (sessionStorage.getItem("empleadoseleccionado")) {
    carritoEmpleado = JSON.parse(sessionStorage.getItem("empleadoseleccionado"));
    let index = -1;
    for(let i = 0; i < carritoEmpleado.length; i++) {
      if(item.idempleado === carritoEmpleado[i].idempleado) {
        index = i;
        break;
      }
    }
    if(index === -1) {
      carritoEmpleado.push(item);
      sessionStorage.setItem("empleadoseleccionado", JSON.stringify(carritoEmpleado));
    }
  } else {
    carritoEmpleado.push(item);
    sessionStorage.setItem("empleadoseleccionado", JSON.stringify(carritoEmpleado));
  }
}
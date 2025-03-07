export const comunicacion = async (endpoint) => {
  let datosRecibido = await fetch(endpoint); // GET
  
  return datosRecibido.json();
};

export const comunicacionBorrar = async (endpoint) => {
  let datoEnviado = {
    method:'DELETE'
  }
  let datosRecibido = await fetch(endpoint,datoEnviado); // delete
  let datosRecibidoJson = await datosRecibido.json();
  
  return datosRecibidoJson;
};

export const comunicacionGardar = async (endpoint,datos) => {
  let datoEnviado = {
    method:'PUT',
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify(datos)
  }
  let datosRecibido = await fetch(endpoint,datoEnviado); // delete
  let datosRecibidoJson = await datosRecibido.json();

  return datosRecibidoJson;
};

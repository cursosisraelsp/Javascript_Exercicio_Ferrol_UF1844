import { comunicacion } from "./comunicacion/comunicacion.servidor.js";
import { endpoints } from "./datos/datos.js";
import { eventoCrearFactura } from "./funcions/eventos.js";
import {filas} from "./funcions/funcions_ini.js";
import { listaFacturas, pintarFacturas,crearFactura } from "./funcions/funcions_programa.js";

sair.addEventListener("click", () => {
  localStorage.removeItem("usuario"); // BORRA O USUARIO, colle a variable do navegador
  location.replace("/"); // SAIMOS OU INTERPRETAMOS QUE SAIMOS
});
// location.pathname recolle o 'endpoint' ou texto despois de '/'
console.log("pathname: ", location.pathname);
// O location.pathname DETECTA A PÁXINA QUE ESTÁ A CARGAR
// E ENTRA NO IF,
// DEPENDENDO DE ONDE ENTRE FARÁ UNHA COUSA OU OUTRA
if (location.pathname == "/invoce") {
  
  // REALIZAMOS A PETICIÓN O SERVIDOR
  // Con datosRecibidos imprimiremos na tabla
  let datosRecibidos = await comunicacion(endpoints.facturasclientes);
  //console.log("datos ", datosRecibidos);
  //console.log("para pintar a lista ",listaFacturas(datosRecibidos))
  pintarFacturas(listaFacturas(datosRecibidos))
  
}
if (location.pathname == "/factura") {
  console.log("Estou en factura");
  eventoCrearFactura(crearFactura);
  enviar.addEventListener("click",async ()=>{
    console.log("enviando datos ")
    let corpoDaTaboa = document.querySelector("tbody");
    let filasTaboa = corpoDaTaboa.children;
    const fil = [];
    const datosFila = {};

    let elemento = 0;
    for(let filaTaboa of filasTaboa){

      console.log("filaTaboa: ",filaTaboa)
      datosFila[`f${elemento}`] = filas(filaTaboa.children)
      elemento++;
    }

    //fil.push(datosFila)
    console.log(" fil ",fil);
    let datos = {filasTabla: datosFila} // creamos o obxeto a enviar
    let datoEnviadoJSON = {}
    datoEnviadoJSON = {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos)
    };  

    let respostaRecibida = await fetch("/datosfacturas",datoEnviadoJSON);
    
    let respostaRecibidaJson = await respostaRecibida.json();
    console.log("resposta recibida ", respostaRecibidaJson)
  })
}

/*
// ESTA É OUTRA FORMA, ENGANDIDO TODO NO 'IF' 
// FAI A PETICION 'GET' O SERVIDOR
if (location.pathname == "/invoce") {
 
  // No seguinte código 'datos' é unha función
  // isto implica que o ser unha función 'asíncrona', levará cando a chamemos 'await'
  let datos = async (endpoint) => {
    let datosRecibido = await fetch(endpoint); // GET
    return datosRecibido.json();
  };
  let datosRecibidos = await datos(endpoints.facturasclientes); // EJECUTA A FUNCIÓN 'datos'
  console.log("datos ", datosRecibidos);
} */

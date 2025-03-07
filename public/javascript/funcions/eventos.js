import { refBotonDone } from "../referencias/REFERENCIAS.js";
// eventoCrearFactura non o estou a utilizar
export function eventoCrearFactura(crearFactura){
  console.log("refBotonDone ",refBotonDone)
  refBotonDone.addEventListener("click",crearFactura)
}


export const eventoEliminarEditar = (refIconos,funcion)=>{
  //console.log("refIconos ",refIconos)
  for(let ref of refIconos){
    console.log("ref interna ",ref)
    ref.addEventListener("click",funcion)
  }
}
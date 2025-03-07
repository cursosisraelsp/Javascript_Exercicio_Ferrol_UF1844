import { crearElementos } from "./helpers.js"

export function lerValores (elementos){
  let valores = []
  for(let elemento of elementos){
    valores.push(elemento.lastElementChild.value)
    //valores.push(elemento)
  }
  return valores
}

export const creoLista = (valores,etiqueta)=> {
  let lista = [];
  for(let contador = 0; contador <= valores.length ; contador++){
    let etiquetas = crearElementos(etiqueta)
    etiquetas.innerHTML = valores[contador];
    lista.push(etiquetas)
    if(contador == valores.length){
      etiquetas.innerHTML = valores[valores.length - 3] * valores[valores.length - 2];
      lista.push(etiquetas)
    }
  }
  
  return lista
}

export const pintoValoresNaTabla =  (valores,etiqueta,refTabla) => {
  let _tr = crearElementos(etiqueta);
  for(let _td of valores){
    _tr.append(_td)
  }
  refTabla.append(_tr)
}

export const sumaTotal = (refTBody) =>{
  let suma = 0
  for(let valor of refTBody.children){
    suma += parseFloat(valor.lastChild.textContent)
  }
  return suma
}
export function filas(fila){
    let novoDato = {}
    let num = 0;
    for(let datos of fila){
      let dato = datos.textContent;
      if(num == 2 || num == 3 || num == 5){
        dato = parseFloat(datos.textContent)
      }
      novoDato[`${num}`] = dato;
      num++;
      console.log("dato: ",dato,"novoDato ",novoDato)
    }
    return novoDato;
}
export const pintoSumaTotal = (total,refTBody,etiquetas)=>{
  let _div = crearElementos(etiquetas.div)
  _div.innerHTML = `Total factura: ${total}€`
  if(refTBody.nextElementSibling != undefined){
    refTBody.nextElementSibling.remove()
  }
  refTBody.after(_div)
}
export const crearElementos = (etiqueta) => document.createElement(etiqueta) ;

export const crearObxetosModificados = (array) => {
  let obxeto = {
    data:array[0].textContent ,
    codigo: array[1].textContent,
    producto: array[2].textContent,
    cantidade: parseFloat(array[3].textContent),
    precio:parseFloat(array[4].textContent),
    total:parseFloat(array[5].textContent),
    pagada:array[6].textContent
  }
  return obxeto
}
                                                  
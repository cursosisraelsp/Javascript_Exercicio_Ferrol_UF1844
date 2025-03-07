import { etiquetas } from "../datos/datos.js";
import { inputs, refTBody } from "../referencias/REFERENCIAS.js";
import { eventoEliminarEditar } from "./eventos.js";
import { comunicacionBorrar,comunicacionGardar } from "../comunicacion/comunicacion.servidor.js";
import {
  creoLista,
  lerValores,
  pintoSumaTotal,
  pintoValoresNaTabla,
  sumaTotal,
} from "./funcions_ini.js";
import { crearObxetosModificados } from "./helpers.js"

const crearFactura = () => {
  
  const valoresInputs = lerValores(inputs); // isto son as entradas da factura
  const listaTd = creoLista(valoresInputs, etiquetas.td); // crea a lista para a tabla cos 'td'
  let sumaTotalFactura = sumaTotal(refTBody); //coa referencia da tabla accede os valores

  pintoValoresNaTabla(listaTd, etiquetas.tr, refTBody);
  //pintoValoresNaTabla(creoLista(lerValores(inputs),etiquetas.td),etiquetas.tr,refTBody);

  pintoSumaTotal(sumaTotalFactura, refTBody, etiquetas);
};

const listaFacturas = (valores) => {
  const arrayListaTabla = valores.map(
    ({
      ID_FACTURAS,
      CANTIDADE,
      CODIGO_FACTURA,
      DATA,
      NOME_PRODUCTO,
      PAGADA,
      PRECIO,
      TOTAL,
    }) => {
      let mensaxe = "";
      // <condición> ? <si condición certa> : <si condición falsa>;
      PAGADA == 1 ? (mensaxe = "PAGADA") : (mensaxe = "NON PAGADA"); // ? ==> if(){} o : ==> else
      /*
    if(PAGADA == 1){
      mensaxe = "PAGADA"
    }else{
      mensaxe = "NON PAGADA"
    }
    */
      return `<!--${ID_FACTURAS}--><td contenteditable="false" >${DATA}</td><td contenteditable="false" >${CODIGO_FACTURA}</td><td contenteditable="false" >${NOME_PRODUCTO}</td><td contenteditable="false" >${CANTIDADE}</td><td contenteditable="false" >${PRECIO}</td><td contenteditable="false" >${TOTAL}</td><td contenteditable="false" >${mensaxe}</td><td contenteditable="false"><img class="icono" name="icono-eliminar" src="../../imaxes/svg/basura.svg" alt="eliminar"><img class="icono" name="icono-editar" src="../../imaxes/svg/pincel.svg" alt="editar"><img class="icono" name="icono-gardar" src="../../imaxes/svg/gardar.svg" alt="gardar"></td>`;
    },
  );
  return arrayListaTabla;
};

const editarTds = (e) => {
  let tds = e.target.parentElement.parentElement.children;
  console.log("e.target ", e.target);
  for (let numTd = 0; numTd < tds.length - 1; numTd++) {
    tds[numTd].setAttribute("contenteditable", "true");
    //tds[numTd].setAttribute("name", "edicion");
    tds[0].setAttribute("name", "edicion");
    tds[0].setAttribute("contenteditable", "true");
    tds[numTd].addEventListener("input", () => {
      tds[numTd].setAttribute("name", "edicion");
    });
  }
};
const gardarTdsFactura = async (e) => {
  //e.target.parentElement.parentElement.remove()
  console.log("e.target ????", e.target);
  console.log("textContent ",e.target.parentElement.parentElement.childNodes[0].textContent);
  let tds = e.target.parentElement.parentElement.children;// ESTES SON OS td
  console.log("e.target ", e.target);

  for (let numTd = 0; numTd < tds.length - 1; numTd++) {
    tds[numTd].removeAttribute("name");
    tds[numTd].setAttribute("contenteditable", "false");
    //console.log("VALOR DO td ",tds[numTd].textContent,numTd);
  }

  let datoAEnviar = crearObxetosModificados(tds)
  console.log('datoAEnviar ',datoAEnviar)
   let id = parseInt(e.target.parentElement.parentElement.childNodes[0].textContent)
  //console.log('id? ',id)
  let datoRecibido = await comunicacionGardar(`/updatedatosfactura/${id}`,datoAEnviar);
  
    console.log("resposta recibida ",datoRecibido)
};
const borrarFacturas = async (e) => {
  //e.target.parentElement.parentElement.remove()
  console.log("e.target ", e.target);
  console.log(
    "textContent ",
    e.target.parentElement.parentElement.childNodes[0].textContent,
  );
  /* let id = parseInt(e.target.parentElement.parentElement.childNodes[0].textContent)
    let datoRecibido = await comunicacionBorrar(`/borrarfactura/${id}`);
    console.log("resposta recibida ",datoRecibido) */
};
const pintarFacturas = (arrayValores) => {
  arrayValores.map((listaTd) => {
    let tr = document.createElement("tr");
    tr.innerHTML = listaTd;
    refTBody.append(tr);
  });
  //console.log("....",document.querySelectorAll("[name='icono-eliminar']"))

  eventoEliminarEditar(
    document.querySelectorAll("[name='icono-eliminar']"),
    borrarFacturas,
  );
  eventoEliminarEditar(
    document.querySelectorAll("[name='icono-editar']"),
    editarTds,
  );
  eventoEliminarEditar(
    document.querySelectorAll("[name='icono-gardar']"),
    gardarTdsFactura,
  );
};
export {
  crearFactura,
  listaFacturas,
  pintarFacturas,
  editarTds,
  borrarFacturas,
  gardarTdsFactura,
};

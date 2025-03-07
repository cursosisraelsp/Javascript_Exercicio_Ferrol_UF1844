const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));// datos do FORMULARIO ==> OBLIGATORIO
app.use(cors());
// Middlewares
const { 
    logueo,
    creoUser,
    invoceUsers,
    datosFacturas,
    borrarFactura,
    modificarDatosFactura} = require("./middlewares/funcions.middlewares.js");
const {
    paxinaLogueo,
    paxinaCreacionUser,
    paxinaFactura,
    paxinaFacturas
} = require("./middlewares/funcions.views.js");
// Accedo o arquivo estático
app.use(express.static(path.join(__dirname, "public")));

app.post("/logueo", logueo); // loguéome
app.get("/logueo", paxinaLogueo); // envío a páxina

app.post("/crearuser", creoUser); // creo o usuario
app.get("/crearuser", paxinaCreacionUser); // envío a páxina

app.get("/factura", paxinaFactura); // envío a páxina
app.get("/invoce", paxinaFacturas);
app.get("/facturasclientes",invoceUsers);// ENDPOINT CREADO NOVO ==> IMPORTANTE

app.post("/datosfacturas",datosFacturas)
// verbos para modifica ==> PUT ==> update na base de datos
app.put("/updatedatosfactura/:id",modificarDatosFactura)
// verbos delete
app.delete("/borrarfactura/:id",borrarFactura)
//START SERVER
app.listen(3000, function () {
    console.log("Server running");
});

/**
 * TEMOS QUE DARNOS CONTA NA RUTA DE sendFile
 * QUE TEMOS QUE SAIR DESTA CARPETA PARA ATOPAR
 * A CARPETA 'views'
 * POR ISO TEMOS OS DOUS PUNTOS '../'
 */
const path = require("path");

const paxinaLogueo = (req, res) => {
    const optionsRuta = {
        root: path.join(__dirname, "../public"),
    };
    res.sendFile("./views/logueo.html", optionsRuta);
};
const paxinaCreacionUser = (req, res) => {
    const optionsRuta = {
        root: path.join(__dirname, "../public"),
    };
    res.sendFile("./views/crearuser.html", optionsRuta);
};

const paxinaFactura = (req, res) => {
    const optionsRuta = {
        root: path.join(__dirname, "../public"),
    };
    res.sendFile("./views/factura.html", optionsRuta);
};
const paxinaFacturas = (req, res) => {
    const optionsRuta = {
        root: path.join(__dirname, "../public"),
    };
    res.sendFile("./views/invoce.html", optionsRuta);
};
module.exports = {
    paxinaLogueo,
    paxinaCreacionUser,
    paxinaFactura,
    paxinaFacturas
};

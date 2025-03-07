const sqlite3 = require("sqlite3").verbose();

function creoBBDD() {
    const db = new sqlite3.Database(
        "mi_bbdd.db",
        sqlite3.OPEN_READWRITE,
        (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log("conectado ...");
        },
    );
    db.exec(
        `   CREATE TABLE if not exists USERS(
                 ID_USER INTEGER PRIMARY KEY AUTOINCREMENT,
                 NAME_USER           CHAR(50),
                 APELIDO1            CHAR(50),
                 APELIDO2            CHAR(50),
                 PWD                 CHAR(50),
                 EMAIL               CHAR(50)
              );
              CREATE TABLE if not exists FACTURAS(
                   ID_FACTURAS INTEGER PRIMARY KEY AUTOINCREMENT,
                   CODIGO_FACTURA           CHAR(50),
                   NOME_PRODUCTO            CHAR(50),
                   CODIGO_PRODUCTO          CHAR(50),
                   CANTIDADE            INTEGER,
                   PRECIO               REAL,
                   PAGADA               INTEGER
                );
                CREATE TABLE  if not exists FACTURASRANDOM(
                   ID_FACTURAS INTEGER PRIMARY KEY AUTOINCREMENT,
                   CODIGO_FACTURA           CHAR(50),
                   NOME_PRODUCTO            CHAR(50),
                   CANTIDADE            INTEGER,
                   PRECIO               REAL,
                   DATA                CHAR(50),
                   TOTAL               REAL,
                   PAGADA               INTEGER
                );
              CREATE TABLE  if not exists BEBIDAS(
                 ID_BEBIDA INTEGER PRIMARY KEY AUTOINCREMENT,
                 NAME             CHAR(50),
                 CODIGO         CHAR(50),
                 PRECIO         REAL
              );
              CREATE TABLE  if not exists COMIDAS(
                 ID_COMIDAS INTEGER PRIMARY KEY AUTOINCREMENT,
                 NAME             CHAR(50),
                 CODIGO         CHAR(50),
                 PRECIO         REAL
              );
              CREATE TABLE  if not exists COMPRAS(
                 ID_COMPRAS INTEGER PRIMARY KEY AUTOINCREMENT,
                 ID_USER_COMPRAS INTEGER,
                 ID_COMIDAS_COMPRAS INTEGER,
                 ID_BEBIDAS_COMPRAS INTEGER,
                 FOREIGN KEY(ID_USER_COMPRAS) REFERENCES USERS(ID_USER),
                 FOREIGN KEY(ID_COMIDAS_COMPRAS) REFERENCES COMIDAS(ID_COMIDAS),
                 FOREIGN KEY(ID_BEBIDAS_COMPRAS) REFERENCES BEBIDAS(ID_BEBIDAS)
              );`,
        (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log("creada ...");
        },
    );
    return db;
}
/*function creoBBDD() {
    const db = new sqlite3.Database(
        "outra_bbdd.db",
        sqlite3.OPEN_READWRITE,
        (err) => {
            if (err) {
                console.error(err.message);
            }
            console.log("conectado ...");
        },
    );
    return db;
}*/
module.exports = creoBBDD();

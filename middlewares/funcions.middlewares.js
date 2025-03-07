const { inserto } = require("./funcions.bbdd.js");
const db = require("../creo_bbdd.js");
const logueo = (req, res) => {
  
  const { user_email, user_pwd } = req.body;
  
  console.log("user_email, user_pwd ",user_email, user_pwd)
  db.get("select * from users WHERE pwd = ? and email = ?", [user_pwd,user_email], (err, row) => {
    if (err) {
      res.status(500).json({ error: "Error al realizar la consulta" });
      return;
    }

    if (!row) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
      if (user_pwd == row.PWD && user_email == row.EMAIL) {
          
          res.send({
                    estado: "ok",
                    usuario: {
                      nome: row.NAME_USER
                    },
                  });
      };
    
  });

};

const creoUser = (req, res) => {
  const { user_email, user_name, user_apelido1, user_apelido2, user_pwd} = req.body;

  let condicion =
    user_email != "" &&
    user_name != "" &&
    user_apelido1 != "" &&
    user_apelido2 != "" &&
    user_apelido2 != "" &&
    user_pwd != "";// CONDICIÓN CON "PINZAS"
  let mensajeEnviado = {};
  if (condicion) {
    // CREAMOS USUARIO
    inserto(req.body);
    mensajeEnviado.estado = "ok";
    mensajeEnviado.mensaje = "usuario creado";
    
  } else {
    mensajeEnviado.estado = "ok";
    mensajeEnviado.mensaje = "usuario no creado";
  }
  res.send(mensajeEnviado);
};
const datosFacturas = (req,res,next) =>{
  const {filasTabla} = req.body;
  console.log("datos recibidos ", filasTabla)
  try{
      for (const obxeto in filasTabla) {
        console.log(Object.values(filasTabla[obxeto]));
        db.run("INSERT INTO FACTURASRANDOM(CODIGO_FACTURA,NOME_PRODUCTO,CANTIDADE,PRECIO,DATA,TOTAL,PAGADA) VALUES (?,?,?,?,?,?,1)",Object.values(filasTabla[obxeto]),(err) => {
                  if (err) {
                      throw err;
                  }
                 console.log(`A row has been inserted with rowid ${this.lastID}`);
              })
      }
  }catch(error){
      throw error
  }finally{
    //db.close()
    res.send({mensaxe:"datos insertados?"})
  }
}
const invoceUsers = (req,res) => {
 
  db.all("select * from facturasrandom",(err, filas) => {
            if (err) {
                throw err;
            }
            console.log(filas)
          res.send(filas)
        })
}
const borrarFactura = (req,res) => {
  //‘DELETE FROM’ <NOME DA TABLA> ‘WHERE’ <condicións> 
  // delete from facturasrandom where id_facturas = <id..>
  // app.delete("/borrarfactura/:id",borrarFactura)
      const {
        id
            } = req.params;// recollemos o ID_FACTURAS
    db.run("delete from facturasrandom where id_facturas = ?",[id],(err) => {
              if (err) {
                  throw err;
              }
             console.log(`A row has been deleted with rowid ${this.lastID}`);
          })
    console.log('o id recibido é ',id);
  
    res.send({mensaxe:"dato recibido"})
  }

const modificarDatosFactura = (req,res)=>{
  const {id} = req.params;
  const {codigo,producto,cantidade,precio,data,total,pagada} = req.body;
  console.log("chegan os datos",codigo,producto,cantidade,precio,data,total,pagada,id)
  db.run("update facturasrandom set CODIGO_FACTURA = ? , NOME_PRODUCTO = ? , CANTIDADE = ? ,PRECIO = ?,DATA = ?,TOTAL = ?,PAGADA = ? where id_facturas = ?",[codigo,producto,cantidade,precio,data,total,pagada,id],(err) => {
             if (err) {
                 throw err;
             }
            console.log(`A row has been deleted with rowid ${this.lastID}`);
         })

  res.send({mensaxe:"mensaxe recibido"})
}

module.exports = {
  logueo,
  creoUser,
  invoceUsers,
  datosFacturas,
  borrarFactura,
  modificarDatosFactura
};

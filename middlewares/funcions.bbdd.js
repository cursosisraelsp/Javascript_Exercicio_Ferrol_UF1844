const db = require("../creo_bbdd.js");

function inserto(datos) {
    const { user_email, user_name, user_apelido1, user_apelido2, user_pwd } =
        datos;
    
    db.run(
        `insert into users(name_user,apelido1,apelido2,pwd,email) values (?,?,?,?,?)`,
        [user_name, user_apelido1, user_apelido2, user_pwd, user_email],
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`inserta ${this.lastID}`);
        },
    );
}


/* function leoDatos(datos) {
    const { user_email, user_pwd } = datos;
    db.all("select * from users", [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            if (user_pwd == row.PWD && user_email == row.EMAIL) {
                console.log(row);
                return true;
            }
        });
    });
} */

module.exports = {
    inserto
};

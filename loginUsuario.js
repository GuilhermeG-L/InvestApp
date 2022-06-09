const { Connection, Request } = require("tedious");


var btnLogar = document.querySelector('#btn-login');
btnLogar.addEventListener('click', ()=>{
  let email = (document.querySelector('#input-email').value);
  let senha = (document.querySelector('#input-pw').value);

  // Configuração de conexão DB.
  const config = {
    authentication: {
      options: {
        userName: "sqlserver",
        password: "IES301%Inve$tApp"
      },
      type: "default"
    },
    server: "35.199.92.55",
    options: {
      database: "InvestApp",
      encrypt: true
    }
  };

  // Query MS SQL
  const connection = new Connection(config);

  // Tentativa de conexão.
  connection.on("connect", err => {
    if (err) {
      ipc.send('erroconexao');
    } else {queryDatabase();}
  });

  // Conexão do DB.
  connection.connect();

  // Função de criação de Query.
  function queryDatabase() {
    console.log("Lendo dados da tabela...");

    const request = new Request(
      `SELECT u.CodUsuario
      FROM dbo.Usuario u
      Where Email = \'${email}\' AND Senha = \'${senha}\'`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        }
        else {
          console.log(`${rowCount} linha(s) retornadas`);
        }
      }
    );
      
    // Console.log da query.
    request.on("row", columns => {
      columns.forEach(column => {
        user = ("%s\t%s", /*column.metadata.colName,*/ column.value);
        console.log(user);
        teste = 'ITAÚÁÉÍÓ   A'
        window.location = "../Home/home.html?user="+user + "&teste="+teste; // TIRAR TESTE DEPOIS
      });
    })

    connection.execSql(request);
  }})

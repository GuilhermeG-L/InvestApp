const { Connection, Request } = require("tedious");


  var btnRegistro = document.querySelector('.btnRegistro');
  btnRegistro.addEventListener('click', ()=>{
    let nome = (document.querySelector('#input-name').value);
    let sobrenome = (document.querySelector('#input-lastname').value);
    var email = (document.querySelector('#input-emailreg').value);
    var senha = (document.querySelector('#input-pwreg').value);
  
    console.log(nome);
    console.log(email);
    console.log(senha);
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
        `Insert Into dbo.Usuario values (\'${email}\', \'${nome}\', \'${sobrenome}\', \'${senha}\');`,
        (err, rowCount) => {
          if (err) {
            console.log(err.message);
          }
          else {
            console.log(`${rowCount} linha(s) retornadas`);
            if (rowCount != 1) {console.log('erroinsert');}
            else {window.location = '../LoginRegistro/loginMobile.html'}
          }
        }
      );
      
      // Console.log da query.
      request.on("row", columns => {
        columns.forEach(column => {
          valInput = ("%s\t%s", /*column.metadata.colName,*/ column.value);
          console.log(valInput);
        });
      });
  
      connection.execSql(request);
    }})
const { Connection, Request } = require("tedious");

const urlParams = new URLSearchParams(window.location.search);
const teste = urlParams.get('teste'); // TIRAR TESTE DEPOIS
const user = urlParams.get('user');

console.log(user);
console.log(teste);
  // Configuração de conexão DB.
  const config = {
    authentication: {
      options: {
        userName: "InvestApp",
        password: "InvestApp"
      },
      type: "default"
    },
    server: "localhost",
    options: {
      database: "InvestApp",
      encrypt: true
    }
  };

  // Query MS SQL - Saldo
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
      `SELECT SUM(c.Saldo)
      FROM dbo.Conta c
      Where c.CodUsuario = \'${user}\'`, 
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        }
        else {
          console.log(`${rowCount} linha(s) retornadas`);
        }
      }
    );
    
    var i = 1;

    // Console.log da query.
    request.on("row", columns => {
      columns.forEach(column => {
        dado = ("%s\t%s", /*column.metadata.colName,*/ column.value);
        console.log(dado);
        if (dado != null) {
          dado = dado.toFixed(2);
          document.getElementById(`v${i}`).textContent = 'R$ ' + dado;
        }
        else {
          document.getElementById(`v${i}`).textContent = '';
        }
        i++;
      });
    });

    connection.execSql(request);
  }


function conexao() {
  // Configuração de conexão DB.
  const config = {
    authentication: {
      options: {
        userName: "InvestApp",
        password: "InvestApp"
      },
      type: "default"
    },
    server: "localhost",
    options: {
      database: "InvestApp",
      encrypt: true
    }
  };

  // Query MS SQL - Receita
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
      `SELECT c.Nome, c.Rendimento 'Rendimento', c.Saldo
      FROM dbo.Conta c
      Where c.CodUsuario = \'${user}\'`, 
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        }
        else {
          console.log(`${rowCount} linha(s) retornadas`);
        }
      }
    );
    
    var i = 1;

    // Console.log da query.
    request.on("row", columns => {
      columns.forEach(column => {
        dado = ("%s\t%s", /*column.metadata.colName,*/ column.value);
        console.log(dado);
        if (dado > -1) {
          if (column.metadata.colName == 'Rendimento') {
            dado = dado.toFixed(2);
            document.getElementById(`Rtd${i}`).textContent = dado + '% a.a.';
          }
          else {
            dado = dado.toFixed(2);
            document.getElementById(`Rtd${i}`).textContent = 'R$ ' + dado;
          }
        }
        else {
          document.getElementById(`Rtd${i}`).textContent = dado;
        }
        i++;
      });
    });

    connection.execSql(request);
  }}

  conexao();
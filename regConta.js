const { Connection, Request } = require("tedious");
const ipc = require('electron').ipcRenderer

const urlParams = new URLSearchParams(window.location.search);
const teste = urlParams.get('teste'); // TIRAR TESTE DEPOIS
const user = urlParams.get('user');
const conta = urlParams.get('conta');

function converterData(data){
  var arrData = data.split('-')
  var [ano, mes, dia] = arrData
  return `${ano}${mes}${dia}`
}

function listagem() {

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
      `SELECT c.NomeConta, c.Saldo, c.Agencia, c.Numero, c.NomeBanco, c.PIX, c.Rendimento
      FROM dbo.Conta c
      Where c.CodUsuario = \'${user}\' AND c.NomeConta = \'${conta}\'`, 
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
        document.getElementById(`input${i}`).value = dado;
        i++;
      });
    });

    connection.execSql(request);
  }
}

listagem();






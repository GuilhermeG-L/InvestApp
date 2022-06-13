const { Connection, Request } = require("tedious");
const ipc = require('electron').ipcRenderer

const urlParams = new URLSearchParams(window.location.search);
const teste = urlParams.get('teste'); // TIRAR TESTE DEPOIS
const user = urlParams.get('user');

console.log(user);
console.log(teste);


//BTNs Conta
function btns () {

  // BTN Add
/*  btnConta = document.querySelector('#btnConta')
  btnConta.addEventListener('click', ()=>{
    window.location = '../Conta/registro-conta.html?user='+user;
  }) */

  // BTNs Editar
  btnEditar1 = document.querySelector('#btnEditar1')
  btnEditar1.addEventListener('click', ()=>{
    const conta = document.querySelector('#Rtd1').textContent;
    if (conta != '') {window.location = '../Conta/registro-conta.html?user='+user + "&conta="+conta;}
    else {}
  })

  btnEditar2 = document.querySelector('#btnEditar2')
  btnEditar2.addEventListener('click', ()=>{
    const conta = document.querySelector('#Rtd4').textContent;
    if (conta != '') {window.location = '../Conta/registro-conta.html?user='+user + "&conta="+conta;}
    else {}
  })

  btnEditar3 = document.querySelector('#btnEditar3')
  btnEditar3.addEventListener('click', ()=>{
    const conta = document.querySelector('#Rtd7').textContent;
    if (conta != '') {window.location = '../Conta/registro-conta.html?user='+user + "&conta="+conta;}
    else {}
  })

  btnEditar4 = document.querySelector('#btnEditar4')
  btnEditar4.addEventListener('click', ()=>{
    const conta = document.querySelector('#Rtd10').textContent;
    if (conta != '') {window.location = '../Conta/registro-conta.html?user='+user + "&conta="+conta;}
    else {}
  })

  //BTNs Excluir
  btnExcluir1 = document.querySelector('#btnExcluir1')
  btnExcluir1.addEventListener('click', ()=>{
    const conta = document.querySelector('#Rtd1').textContent;
    if (conta != '') {delecao(conta);}
    else {}
  })

  btnExcluir2 = document.querySelector('#btnExcluir2')
  btnExcluir2.addEventListener('click', ()=>{
    const conta = document.querySelector('#Rtd4').textContent;
    if (conta != '') {delecao(conta);}
    else {}
  })

  btnExcluir3 = document.querySelector('#btnExcluir3')
  btnExcluir3.addEventListener('click', ()=>{
    const conta = document.querySelector('#Rtd7').textContent;
    if (conta != '') {delecao(conta);}
    else {}
  })

  btnExcluir4 = document.querySelector('#btnExcluir4')
  btnExcluir4.addEventListener('click', ()=>{
    const conta = document.querySelector('#Rtd10').textContent;
    if (conta != '') {delecao(conta);}
    else {}
  })

};

function delecao(c) {
  var conta = c;
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

  // Query MS SQL - Deleção
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
      `DELETE FROM dbo.Conta
      Where CodUsuario = \'${user}\' AND NomeConta = \'${conta}\'`, 
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        }
        else {
          console.log(`${rowCount} linha(s) retornadas`);
          window.location = '../Conta/Conta.html?user='+user;
        }
      }
    );
    
    var i = 1;

    // Console.log da query.
    request.on("row", columns => {
      columns.forEach(column => {
        dado = ("%s\t%s", /*column.metadata.colName,*/ column.value);
      });
    });

    connection.execSql(request);
  }
}

// --------------------------------------------------- Listas, gráficos, etc

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

  // Query MS SQL - Saldo
  const connection = new Connection(config);

  // Tentativa de conexão.
  connection.on("connect", err => {
    if (err) {
      window.location = "../Erros/erro-conexao.html?user="+user;
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

  // Query MS SQL - Receita
  const connection = new Connection(config);

  // Tentativa de conexão.
  connection.on("connect", err => {
    if (err) {
    } else {queryDatabase();}
  });

  // Conexão do DB.
  connection.connect();

  // Função de criação de Query.
  function queryDatabase() {
    console.log("Lendo dados da tabela...");

    const request = new Request(
      `SELECT c.NomeConta, c.Rendimento 'Rendimento', c.Saldo 'Saldo'
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
        if (column.metadata.colName == 'Rendimento' || column.metadata.colName == 'Saldo') {
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
    connection.execSql(request)
  }}



  function verifqtd() {
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
  
    // Query MS SQL - Receita
    const connection = new Connection(config);
  
    // Tentativa de conexão.
    connection.on("connect", err => {
      if (err) {
      } else {queryDatabase();}
    });
  
    // Conexão do DB.
    connection.connect();
  
    // Função de criação de Query.
    function queryDatabase() {
      console.log("Lendo dados da tabela...");
  
      const request = new Request(
        `SELECT count(*)
        FROM dbo.Conta`, 
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
          dado = parseInt(dado);
          if (dado > 3) {
            btnConta = document.querySelector('#btnConta')
            btnConta.addEventListener('click', ()=>{ipc.send('erroqtdcontas');})
          }
          else {
            btnConta = document.querySelector('#btnConta')
            btnConta.addEventListener('click', ()=>{window.location = '../Conta/registro-conta.html?user='+user;})
          }
        });
      });
      connection.execSql(request)
    }}

  conexao();
  verifqtd(); // Função para verificar qtd de Contas (Limite provisório: 4).
  btns();
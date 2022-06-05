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


function conexao1() {
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
      `SELECT SUM(r.Valor)
      FROM dbo.Receita r
      Where r.CodUsuario = \'${user}\'`, 
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        }
        else {
          console.log(`${rowCount} linha(s) retornadas`);
        }
      }
    );
    
    var i = 2;

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
  }}

function conexao2() {
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
      `SELECT SUM(d.Valor)
      FROM dbo.Despesa d
      Where d.CodUsuario = \'${user}\'`, 
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        }
        else {
          console.log(`${rowCount} linha(s) retornadas`);
        }
      }
    );
    
    var i = 3;

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
  }}





  function conexao3() {
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

  // Query MS SQL - Últimas Despesas
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
      `SELECT TOP 4 c.Nome, d.Valor
      FROM dbo.Usuario u
      Inner Join dbo.Conta c ON u.CodUsuario = c.CodUsuario
      Inner Join dbo.Despesa d ON c.CodConta = d.CodConta
      Where u.CodUsuario = \'${user}\'`, 
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
          dado = dado.toFixed(2);
          document.getElementById(`Dtd${i}`).textContent = 'R$ ' + dado;
        }
        else {
          document.getElementById(`Dtd${i}`).textContent = dado;
        }
        i++;
      });
    });

    connection.execSql(request);
  }}






function conexao4() {
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
  
  // Query MS SQL - Últimas Receitas
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
      `SELECT TOP 4 c.Nome, r.Valor
      FROM dbo.Usuario u
      Inner Join dbo.Conta c ON u.CodUsuario = c.CodUsuario
      Inner Join dbo.Receita r ON c.CodConta = r.CodConta
      Where u.CodUsuario = \'${user}\'`, 
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
          dado = dado.toFixed(2);
          document.getElementById(`Rtd${i}`).textContent = 'R$ ' + dado;
        }
        else {
          document.getElementById(`Rtd${i}`).textContent = dado;
        }
        i++;
      });
    });

    connection.execSql(request);
  }}
  
  conexao1();
  conexao2();
  conexao3();
  conexao4();
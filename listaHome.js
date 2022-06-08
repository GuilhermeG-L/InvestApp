const { Connection, Request } = require("tedious");
const Chart = require('chart.js');

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
        `SELECT sum(d.Valor), d.Categoria
        FROM dbo.Usuario u
        Inner Join dbo.Despesa d ON u.CodUsuario = d.CodUsuario
        Where u.CodUsuario = \'${user}\'
        Group By d.Categoria`, 
        (err, rowCount) => {
          if (err) {
            console.error(err.message);
          }
          else {
            console.log(`${rowCount} linha(s) retornadas`);
          }
        }
      );


          // Variáveis para criação do chart
      var c = document.getElementById("myChart");
      var data = {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"],
          hoverBackgroundColor: ["#02559e", "#bf3028", "#1f8c2b", "#cc6a14", "#6bb8d6", "#89099c", "#ccb000", "#000f1f", "#2fa8a8", "#02ba52", "#540d2f", "#a30d81", "#265e45", "#111111", "#757575"]
        }]
      };
      var options = {
        cutout: '60%',
        hoverOffset: 10,
        title: {
          display: true,
          text: 'TESTE'
        }
      };
      var opt = {
      
      type: "doughnut",
      data: data,
      options: options
      };
      var chart = new Chart(c,opt);

      Chart.overrides.doughnut.plugins.legend.display = true
      Chart.overrides.doughnut.plugins.legend.position = 'left'
  
      // Console.log da query.
      request.on("row", columns => {
        columns.forEach(column => {
          dado = ("%s\t%s", /*column.metadata.colName,*/ column.value);
          console.log(dado);
          //Adicionando os dados numéricos no Chart.
          if (dado > -1) {
            chart.config.data.datasets[0].data.push(`${dado}`);
            chart.update();
          }
          //Adicionando os labels no Chart.
          else {
            chart.config.data.labels.push(`${dado}`);
            chart.update();
          }
          console.log(dado);
        });
      });
  
      connection.execSql(request);
    }}


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
  
  conexao();
  conexao1();
  conexao2();
  conexao3();
  conexao4();
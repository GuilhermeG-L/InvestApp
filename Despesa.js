const { Connection, Request } = require("tedious");
const ipc = require('electron').ipcRenderer

const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user');


// BTNs Despesa
function btns () {

  // BTN Menu
  var btnOpt = document.querySelector('#opcoes');
  btnOpt.addEventListener('change', ()=>{
    window.location = '../ReceitasDespesas/receitas.html?user='+user;
  });



  // BTNs Editar/Excluir - Lista
  var btnEdita1 = document.querySelector('#btnEdita1'); 
  btnEdita1.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td1`).textContent); 
    const conta = document.querySelector(`#td2`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui1 = document.querySelector('#btnExclui1'); 
  btnExclui1.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td1`).textContent); 
    const conta = document.querySelector(`#td2`).textContent; 
    const valor = parseFloat(document.querySelector(`#td4`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita2 = document.querySelector('#btnEdita2'); 
  btnEdita2.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td6`).textContent); 
    const conta = document.querySelector(`#td7`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui2 = document.querySelector('#btnExclui2'); 
  btnExclui2.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td6`).textContent); 
    const conta = document.querySelector(`#td7`).textContent; 
    const valor = parseFloat(document.querySelector(`#td9`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita3 = document.querySelector('#btnEdita3'); 
  btnEdita3.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td11`).textContent); 
    const conta = document.querySelector(`#td12`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui3 = document.querySelector('#btnExclui3'); 
  btnExclui3.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td11`).textContent); 
    const conta = document.querySelector(`#td12`).textContent; 
    const valor = parseFloat(document.querySelector(`#td14`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita4 = document.querySelector('#btnEdita4'); 
  btnEdita4.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td16`).textContent); 
    const conta = document.querySelector(`#td17`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui4 = document.querySelector('#btnExclui4'); 
  btnExclui4.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td16`).textContent); 
    const conta = document.querySelector(`#td17`).textContent; 
    const valor = parseFloat(document.querySelector(`#td19`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita5 = document.querySelector('#btnEdita5'); 
  btnEdita5.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td21`).textContent); 
    const conta = document.querySelector(`#td22`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui5 = document.querySelector('#btnExclui5'); 
  btnExclui5.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td21`).textContent); 
    const conta = document.querySelector(`#td22`).textContent; 
    const valor = parseFloat(document.querySelector(`#td24`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita6 = document.querySelector('#btnEdita6'); 
  btnEdita6.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td26`).textContent); 
    const conta = document.querySelector(`#td27`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui6 = document.querySelector('#btnExclui6'); 
  btnExclui6.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td26`).textContent); 
    const conta = document.querySelector(`#td27`).textContent; 
    const valor = parseFloat(document.querySelector(`#td29`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita7 = document.querySelector('#btnEdita7'); 
  btnEdita7.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td31`).textContent); 
    const conta = document.querySelector(`#td32`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui7 = document.querySelector('#btnExclui7'); 
  btnExclui7.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td31`).textContent); 
    const conta = document.querySelector(`#td32`).textContent; 
    const valor = parseFloat(document.querySelector(`#td34`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita8 = document.querySelector('#btnEdita8'); 
  btnEdita8.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td36`).textContent); 
    const conta = document.querySelector(`#td37`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui8 = document.querySelector('#btnExclui8'); 
  btnExclui8.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td36`).textContent); 
    const conta = document.querySelector(`#td37`).textContent; 
    const valor = parseFloat(document.querySelector(`#td39`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita9 = document.querySelector('#btnEdita9'); 
  btnEdita9.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td41`).textContent); 
    const conta = document.querySelector(`#td42`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui9 = document.querySelector('#btnExclui9'); 
  btnExclui9.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td41`).textContent); 
    const conta = document.querySelector(`#td42`).textContent; 
    const valor = parseFloat(document.querySelector(`#td44`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita10 = document.querySelector('#btnEdita10'); 
  btnEdita10.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td46`).textContent); 
    const conta = document.querySelector(`#td47`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui10 = document.querySelector('#btnExclui10'); 
  btnExclui10.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td46`).textContent); 
    const conta = document.querySelector(`#td47`).textContent; 
    const valor = parseFloat(document.querySelector(`#td49`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita11 = document.querySelector('#btnEdita11'); 
  btnEdita11.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td51`).textContent); 
    const conta = document.querySelector(`#td52`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui11 = document.querySelector('#btnExclui11'); 
  btnExclui11.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td51`).textContent); 
    const conta = document.querySelector(`#td52`).textContent; 
    const valor = parseFloat(document.querySelector(`#td54`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita12 = document.querySelector('#btnEdita12'); 
  btnEdita12.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td56`).textContent); 
    const conta = document.querySelector(`#td57`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui12 = document.querySelector('#btnExclui12'); 
  btnExclui12.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td56`).textContent); 
    const conta = document.querySelector(`#td57`).textContent; 
    const valor = parseFloat(document.querySelector(`#td59`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita13 = document.querySelector('#btnEdita13'); 
  btnEdita13.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td61`).textContent); 
    const conta = document.querySelector(`#td62`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui13 = document.querySelector('#btnExclui13'); 
  btnExclui13.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td61`).textContent); 
    const conta = document.querySelector(`#td62`).textContent; 
    const valor = parseFloat(document.querySelector(`#td64`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita14 = document.querySelector('#btnEdita14'); 
  btnEdita14.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td66`).textContent); 
    const conta = document.querySelector(`#td67`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui14 = document.querySelector('#btnExclui14'); 
  btnExclui14.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td66`).textContent); 
    const conta = document.querySelector(`#td67`).textContent; 
    const valor = parseFloat(document.querySelector(`#td69`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita15 = document.querySelector('#btnEdita15'); 
  btnEdita15.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td71`).textContent); 
    const conta = document.querySelector(`#td72`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui15 = document.querySelector('#btnExclui15'); 
  btnExclui15.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td71`).textContent); 
    const conta = document.querySelector(`#td72`).textContent; 
    const valor = parseFloat(document.querySelector(`#td74`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita16 = document.querySelector('#btnEdita16'); 
  btnEdita16.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td76`).textContent); 
    const conta = document.querySelector(`#td77`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui16 = document.querySelector('#btnExclui16'); 
  btnExclui16.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td76`).textContent); 
    const conta = document.querySelector(`#td77`).textContent; 
    const valor = parseFloat(document.querySelector(`#td79`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita17 = document.querySelector('#btnEdita17'); 
  btnEdita17.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td81`).textContent); 
    const conta = document.querySelector(`#td82`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui17 = document.querySelector('#btnExclui17'); 
  btnExclui17.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td81`).textContent); 
    const conta = document.querySelector(`#td82`).textContent; 
    const valor = parseFloat(document.querySelector(`#td84`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita18 = document.querySelector('#btnEdita18'); 
  btnEdita18.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td86`).textContent); 
    const conta = document.querySelector(`#td87`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui18 = document.querySelector('#btnExclui18'); 
  btnExclui18.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td86`).textContent); 
    const conta = document.querySelector(`#td87`).textContent; 
    const valor = parseFloat(document.querySelector(`#td89`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita19 = document.querySelector('#btnEdita19'); 
  btnEdita19.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td91`).textContent); 
    const conta = document.querySelector(`#td92`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui19 = document.querySelector('#btnExclui19'); 
  btnExclui19.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td91`).textContent); 
    const conta = document.querySelector(`#td92`).textContent; 
    const valor = parseFloat(document.querySelector(`#td94`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita20 = document.querySelector('#btnEdita20'); 
  btnEdita20.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td96`).textContent); 
    const conta = document.querySelector(`#td97`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui20 = document.querySelector('#btnExclui20'); 
  btnExclui20.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td96`).textContent); 
    const conta = document.querySelector(`#td97`).textContent; 
    const valor = parseFloat(document.querySelector(`#td99`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita21 = document.querySelector('#btnEdita21'); 
  btnEdita21.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td101`).textContent); 
    const conta = document.querySelector(`#td102`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui21 = document.querySelector('#btnExclui21'); 
  btnExclui21.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td101`).textContent); 
    const conta = document.querySelector(`#td102`).textContent; 
    const valor = parseFloat(document.querySelector(`#td104`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita22 = document.querySelector('#btnEdita22'); 
  btnEdita22.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td106`).textContent); 
    const conta = document.querySelector(`#td107`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui22 = document.querySelector('#btnExclui22'); 
  btnExclui22.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td106`).textContent); 
    const conta = document.querySelector(`#td107`).textContent; 
    const valor = parseFloat(document.querySelector(`#td109`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita23 = document.querySelector('#btnEdita23'); 
  btnEdita23.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td111`).textContent); 
    const conta = document.querySelector(`#td112`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui23 = document.querySelector('#btnExclui23'); 
  btnExclui23.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td111`).textContent); 
    const conta = document.querySelector(`#td112`).textContent; 
    const valor = parseFloat(document.querySelector(`#td114`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita24 = document.querySelector('#btnEdita24'); 
  btnEdita24.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td116`).textContent); 
    const conta = document.querySelector(`#td117`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui24 = document.querySelector('#btnExclui24'); 
  btnExclui24.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td116`).textContent); 
    const conta = document.querySelector(`#td117`).textContent; 
    const valor = parseFloat(document.querySelector(`#td119`).textContent); 
    delecao(cod, conta, valor);
  });

  var btnEdita25 = document.querySelector('#btnEdita25'); 
  btnEdita25.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td121`).textContent); 
    const conta = document.querySelector(`#td122`).textContent; 
    window.location = '../ReceitasDespesas/registro-despesa.html?user='+user + "&cod="+cod + "&conta="+conta;
  });

  var btnExclui25 = document.querySelector('#btnExclui25'); 
  btnExclui25.addEventListener('click', ()=>{ 
    const cod = parseInt(document.querySelector(`#td121`).textContent); 
    const conta = document.querySelector(`#td122`).textContent; 
    const valor = parseFloat(document.querySelector(`#td124`).textContent); 
    delecao(cod, conta, valor);
  });

}



function delecao(codigo, c, v) {
  var cod = codigo;
  var conta = c;
  var valor = v;
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
      `DELETE FROM dbo.Despesa
      Where CodUsuario = \'${user}\' AND NomeConta = \'${conta}\' AND CodDespesa = \'${cod}\'`, 
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        }
        else {
          console.log(`${rowCount} linha(s) retornadas`);
          selectsaldo(conta, valor);
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



function selectsaldo(c, v) {
  var conta = c;
  var valor = v;
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
      `SELECT c.Saldo
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
        dado = parseFloat(dado);
        let novosaldo = dado + valor;
        updatesaldo(conta, novosaldo);
      });
    });

    connection.execSql(request);
  }

}



function updatesaldo(c, s) {
  var conta = c;
  var saldo = s;
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
      `UPDATE dbo.Conta
      SET Saldo = \'${saldo}\'
      Where CodUsuario = \'${user}\' AND NomeConta = \'${conta}\'`, 
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        }
        else {
          console.log(`${rowCount} linha(s) retornadas`);
          window.location = '../ReceitasDespesas/despesas.html?user='+user;
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

  // Query MS SQL - Receita
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
    
    var i = 1;

    // Console.log da query.
    request.on("row", columns => {
      columns.forEach(column => {
        dado = ("%s\t%s", /*column.metadata.colName,*/ column.value);
        console.log(dado);
        dado = dado.toFixed(2);
        document.getElementById(`cval${i}`).textContent = 'R$ ' + dado;
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
      `SELECT SUM(d.Valor)
      FROM dbo.Despesa d
      Where d.CodUsuario = \'${user}\' AND MONTH(d.DataDespesa) = MONTH(GETDATE()) AND YEAR(d.DataDespesa) = YEAR(GETDATE())`, 
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
        dado = dado.toFixed(2);
        document.getElementById(`cval${i}`).textContent = 'R$ ' + dado;
        });
      });

    connection.execSql(request);
  }}

function conexao1() {
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

  // Query Azure SQL: Busca Produto.
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
      `SELECT d.CodDespesa, c.NomeConta, d.Categoria, d.Valor, d.DataDespesa
      FROM dbo.Usuario u
      Inner Join dbo.Conta c ON u.CodUsuario = c.CodUsuario
      Inner Join dbo.Despesa d ON c.NomeConta = d.NomeConta
      Where u.CodUsuario = \'${user}\'
      Order By d.DataDespesa DESC`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        }
        else {
          console.log(`${rowCount} linha(s) retornadas`);
          btns();
        }
      }
    );
    
    // Função para conversão de data (BD-Interface).
    function converteData(stringData){
      // Declaração das variáveis
      var arrDados = stringData.split(' ')
      var stringResultado = ''
      var mes, dia, ano
      var [mesString, diaString, anoString] = [arrDados[1], arrDados[2], arrDados[3]]

      // Definição e Conversão do Mês
      switch(mesString){
        case 'Jan':
          mes = '01'
          break;
        case 'Feb':
          mes = '02'
          break;
        case 'Mar':
          mes = '03'
          break;
        case 'Apr':
          mes = '04'
          break;
        case 'May':
          mes = '05'
          break;
        case 'Jun':
          mes = '06'
          break;
        case 'Jul':
          mes = '07'
          break;
        case 'Aug':
          mes = '08'
          break;
        case 'Sep':
          mes = '09'
          break;
        case 'Oct':
          mes = '10'
          break;
        case 'Nov':
          mes = '11'
          break;
        case 'Dec':
          mes = '12'
          break;
      }


      var diaNum = parseInt(diaString)

      //Adicionando um dia
      ano = parseInt(anoString)
      var bissexto =  ((ano % 4 == 0) && ((ano % 100 != 0) || (ano % 400 == 0)))
      if(mes == '02' && bissexto){
        if(diaNum == 29){
          diaNum = 1
          mes = '03'
        }else{
          diaNum += 1
        }
      }else{
        if(mes == '02'){
          if(diaNum == 28){
            diaNum = 1
            mes = '03'
          }else{
            diaNum+=1
          }
        }else if(mes == '01' || mes == '03' || mes == '05' || mes == '07' || mes == '08' || mes == '10' || mes == '12'){ 
            if(diaNum == 31){
              if(mes == '12'){
                anoString = (parseInt(anoString) + 1).toString()
                mes = '01'
                diaNum = 1
              }else{
                mes = (parseInt(mes) + 1).toString()
                diaNum = 1
              }
            }else{
              diaNum += 1
            }
        }else{
          if(diaNum == 30){
            mes = (parseInt(mes) + 1).toString()
            diaNum = 1
          }else{
            diaNum += 1
          }
        }
      }

      // Definição e Ajuste do dia
      if(diaNum < 10){
        dia = `0${diaNum}`
      }else{
        dia = diaNum.toString()
      }

      // Montagem e retorno do Resultado
      stringResultado = `${dia}/${mes}/${anoString}`
      return stringResultado
    }

    // Variáveis para criação das linhas/elementos da tabela
    var i = 1;
    var x = 1;
    var tabela = document.querySelector('#tbDespesa');
    console.log(tabela);
    // Console.log da query.
    request.on("row", columns => {
      var linha = tabela.insertRow(-1);
      columns.forEach(column => {
        dado = ("%s\t%s", /*column.metadata.colName,*/ column.value);
        if(column.metadata.colName == 'Valor') {
          dado = dado.toFixed(2);
          (linha.insertCell(-1)).id = (`td${i}`);
          document.getElementById(`td${i}`).textContent = dado;
          i++;
        }
        else {
          if(typeof dado == 'object'){
            dado = converteData(dado.toString())
          }
          console.log(dado);
          (linha.insertCell(-1)).id = (`td${i}`);
          document.getElementById(`td${i}`).textContent = dado;
          i++;
        }
      });
      // Variáveis para criação das imagens dos botões
      const imgEdita = document.createElement('img');
      const imgExclui = document.createElement('img');
      imgEdita.src  = '../../midia/icons/lapis.png';
      imgExclui.src  = '../../midia/icons/lixo.png';
      (linha.insertCell(-1)).id = (`btnLista${x}`);
      console.log(x);
      document.getElementById(`btnLista${x}`).appendChild(imgEdita).id = (`btnEdita${x}`);
      document.getElementById(`btnLista${x}`).appendChild(imgExclui).id = (`btnExclui${x}`);
      (imgEdita).className = ('btnEdit');
      (imgExclui).className = ('btnExclu');
      console.log(document.getElementById(`btnEdita${x}`));
      console.log(document.getElementById(`btnLista${x}`));
      x++;
    });

    connection.execSql(request);
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
        FROM dbo.Conta
        Where CodUsuario = \'${user}\'`, 
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
          dado = ("%s\t%s", /*column.metadata.colName,*/ column.value);
          if (dado > 0) {
            //BTN Add
            var btnAdd = document.querySelector('#btnDespesa');
            btnAdd.addEventListener('click', ()=>{
                window.location = '../ReceitasDespesas/registro-despesa.html?user='+user;
            });
          }
          else {
            var btnAdd = document.querySelector('#btnDespesa');
            btnAdd.addEventListener('click', ()=>{
                ipc.send('erromincontas');
            });
          }
        });
      });
      connection.execSql(request)
    }}


conexao();
conexao1();
verifqtd();
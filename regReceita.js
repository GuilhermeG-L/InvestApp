const { Connection, Request } = require("tedious");
const ipc = require('electron').ipcRenderer

const urlParams = new URLSearchParams(window.location.search);
const teste = urlParams.get('teste'); // TIRAR TESTE DEPOIS
const user = urlParams.get('user');
const cod = urlParams.get('cod');
const conta = urlParams.get('conta');

console.log(user);
console.log(teste);


if (conta != null && cod != null) {


  function addReceita () {
  var valorAntigo = parseFloat(document.querySelector('#input1').value);
  var btnFinalizar = document.querySelector('.btn-finalizar');
  btnFinalizar.addEventListener('click', ()=>{
    let valor = parseFloat(document.querySelector('#input1').value);
    let categoria = document.querySelector('#input2').value;
    let dataRec = document.querySelector('#input4').value;
    let programacao = document.querySelector('#input5').value;
    let descricao = document.querySelector('#input6').value;
    
    if (programacao == true) {
      programacao = 'Programada';
    }
    else {
      programacao = 'Não Programada';
    }

    console.log(categoria);
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
        `UPDATE dbo.Receita
        SET Valor = \'${valor}\', Categoria = \'${categoria}\', Programacao = \'${programacao}\', DataReceita = \'${dataRec}\', Descricao = \'${descricao}\'
        Where CodUsuario = \'${user}\' AND NomeConta = \'${conta}\' AND CodReceita = \'${cod}\'`,
        (err, rowCount) => {
          if (err) {
            ipc.send('erroupdate');
            console.error(err.message);
          }
          else {
            console.log(`${rowCount} linha(s) retornadas`);
            if (rowCount != 1) {ipc.send('erroupdate');}
            else {selectsaldo(valor, valorAntigo);}
          }
        }
      );
    

      request.on("row", columns => {
        columns.forEach(column => {
          valInput = ("%s\t%s", /*column.metadata.colName,*/ column.value);
          console.log(valInput);
        });
      });

      connection.execSql(request);
    }})
  }


  function selectsaldo(v, vAntigo) {
    var valor = v;
    var valorAntigo = vAntigo;
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
            // window.location = '../ReceitasDespesas/receitas.html?user='+user;
          }
        }
      );
      
      var i = 1;
  
      // Console.log da query.
      request.on("row", columns => {
        columns.forEach(column => {
          dado = ("%s\t%s", /*column.metadata.colName,*/ column.value);
          dado = parseFloat(dado);
          let novosaldo = dado + (valor - valorAntigo);
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
            window.location = '../ReceitasDespesas/receitas.html?user='+user;
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

}






// --------------------------------------------------- 

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
      `SELECT SUM(r.Valor)
      FROM dbo.Receita r
      Where r.CodUsuario = \'${user}\' AND MONTH(r.DataReceita) = MONTH(GETDATE()) AND YEAR(r.DataReceita) = YEAR(GETDATE())`, 
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

  // Query 
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
      `SELECT r.Valor 'Valor', r.Categoria, r.NomeConta 'NomeConta', r.DataReceita, r.Programacao 'Programacao', r.Descricao
      FROM dbo.Receita r
      Where r.CodUsuario = \'${user}\' AND r.CodReceita = \'${cod}\' AND r.NomeConta = \'${conta}\'`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        }
        else {
          console.log(`${rowCount} linha(s) retornadas`);
          addReceita();
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
      stringResultado = `${anoString}-${mes}-${dia}`
      return stringResultado
    }

    // Variáveis para criação das linhas/elementos da tabela
    var i = 1;
    // Console.log da query.
    request.on("row", columns => {
      columns.forEach(column => {
        dado = ("%s\t%s", /*column.metadata.colName,*/ column.value);
        document.getElementById('input3').disabled = true;
        document.getElementById('input3').style.color = '#C4C4C4';
        if(column.metadata.colName == 'Valor') {
          dado = parseFloat(dado).toFixed(2);
          document.getElementById(`input${i}`).value = dado;
        }
        else {
          if (column.metadata.colName == 'NomeConta') {
            document.getElementById(`conta`).value = dado;
            document.getElementById(`conta`).textContent = dado;
          }
          if (column.metadata.colName == 'Programacao') {
            if (dado == 'Programada') {
              dado = true;
              document.getElementById(`input${i}`).checked = dado;
            }
            else {
              dado = false;
              document.getElementById(`input${i}`).checked = dado;
            }
          }
          if(typeof dado == 'object'){
            dado = converteData(dado.toString())
          }
          document.getElementById(`input${i}`).value = dado;
        }
        i++;
      });
    });

    connection.execSql(request);
  }}


  function listagemSelect() {
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
  
    // Query 
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
        `SELECT c.NomeConta 'NomeConta'
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
  
      // Variáveis para criação das linhas/elementos
      var i = 1;
      // Console.log da query.
      request.on("row", columns => {
        columns.forEach(column => {
          dado = ("%s\t%s", /*column.metadata.colName,*/ column.value);
          document.getElementById(`conta-${i}`).value = dado;
          document.getElementById(`conta-${i}`).textContent = dado;
          i++;
        });
      });
  
      connection.execSql(request);
    }}

  
function teste2() {
  console.log(document.querySelector('#input5').checked) // TIRAR DEPOIS
  console.log(document.querySelector('#input3').value) // TIRAR DEPOIS
}

listagem();
listagemSelect();

setInterval(teste2, 2000);
var btnCancelar = document.querySelector('.btn-cancelar');
btnCancelar.addEventListener('click', ()=>{
  window.location = "../ReceitasDespesas/receitas.html?user="+user;
})
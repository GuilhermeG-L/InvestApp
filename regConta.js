const { Connection, Request } = require("tedious");
const ipc = require('electron').ipcRenderer

const urlParams = new URLSearchParams(window.location.search);
const teste = urlParams.get('teste'); // TIRAR TESTE DEPOIS
const user = urlParams.get('user');
const conta = urlParams.get('conta');

console.log(conta);


// -------------------------------------- VERIFICAÇÕES/RESTRIÇÕES

// Declaração de Variáveis
var input1 = document.querySelector('#input1');
var input2 = document.querySelector('#input2');
var input3 = document.querySelector('#input3');
var input4 = document.querySelector('#input4');
var input5 = document.querySelector('#input5');
var input6 = document.querySelector('#input6');
var input7 = document.querySelector('#input7');

// Eventos
input1.addEventListener('keypress', verificaNomeCKey);
input2.addEventListener('change', verificaSaldo);
input3.addEventListener('change', verificaAgencia);
input4.addEventListener('change', verificaNumero);
input5.addEventListener('keypress', verificaBancoKey);
input6.addEventListener('keypress', verificaPIXKey);
input7.addEventListener('change', verificaRendimento);

// Funções

function verificaNomeCKey (event) {  
  var key = event.keyCode;
   if (key === 32) {
     event.preventDefault();
   }
};

function verificaSaldo () {
  let porc = document.querySelector('#input2').value;
  if (porc > 9999999999) {
    document.querySelector('#input2').value = 9999999999;
  }
}

function verificaAgencia () {
  let val = document.querySelector('#input3').value;
  if (val > 9999) {
    document.querySelector('#input3').value = 9999;
  }
}

function verificaNumero () {
  let val = document.querySelector('#input4').value;
  if (val > 99999) {
    document.querySelector('#input4').value = 99999;
  }
}

function verificaBancoKey (event) {  
  var key = event.keyCode;
   if (key === 32) {
     event.preventDefault();
   }
};

function verificaPIXKey (event) {  
    var key = event.keyCode;
     if (key === 32) {
       event.preventDefault();
     }
 };

function verificaRendimento () {
  let val = document.querySelector('#input7').value;
  if (val > 99) {
    document.querySelector('#input7').value = 99;
  }
}

// -------------------------------------- FUNCIONALIDADES

if (conta != null) {

  var btnRegistrar = document.querySelector('.btn-registrar');
  btnRegistrar.addEventListener('click', ()=>{
    let nomeconta = document.querySelector('#input1').value;
    let agencia = document.querySelector('#input3').value;
    let numero = document.querySelector('#input4').value;
    let banco = document.querySelector('#input5').value;
    let pix = document.querySelector('#input6').value;
    let rendimento = parseFloat(document.querySelector('#input7').value);

    if (isNaN(rendimento)) {
      rendimento = 0;
    }

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
        `UPDATE dbo.Conta
        SET NomeConta = \'${nomeconta}\', NomeBanco = \'${banco}\', Agencia = \'${agencia}\', Numero = \'${numero}\', PIX = \'${pix}\', Rendimento = \'${rendimento}\'
        Where CodUsuario = \'${user}\' AND NomeConta = \'${conta}\'`,
        (err, rowCount) => {
          if (err) {
            ipc.send('erroupdate');
            console.error(err.message);
          }
          else {
            console.log(`${rowCount} linha(s) retornadas`);
            if (rowCount != 1) {ipc.send('erroupdate');}
            else {window.location = "../Conta/Conta.html?user="+user;}
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

    listagem();

}

else {

  var btnRegistrar = document.querySelector('.btn-registrar');
  btnRegistrar.addEventListener('click', ()=>{
    let nomeconta = document.querySelector('#input1').value;
    let saldo = parseFloat(document.querySelector('#input2').value);
    let agencia = document.querySelector('#input3').value;
    let numero = document.querySelector('#input4').value;
    let banco = document.querySelector('#input5').value;
    let pix = document.querySelector('#input6').value;
    let rendimento = parseFloat(document.querySelector('#input7').value);
    
    if (isNaN(rendimento)) {
      rendimento = 0;
    }

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
        `Insert Into dbo.Conta values (\'${nomeconta}\', \'${user}\', \'${banco}\', \'${saldo}\', \'${agencia}\', \'${numero}\', \'${pix}\', \'${rendimento}\');`,
        (err, rowCount) => {
          if (err) {
            ipc.send('erroinsert');
            console.error(err.message);
          }
          else {
            console.log(`${rowCount} linha(s) retornadas`);
            if (rowCount != 1) {ipc.send('erroinsert');}
            else {window.location = "../Conta/Conta.html?user="+user;}
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
      window.location = "../Erros/erro-conexao.html?user="+user;
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
          ipc.send('erroselect'); window.location = "../Conta/Conta.html?user="+user;
        }
        else {
          console.log(`${rowCount} linha(s) retornadas`);
          if (rowCount != 1) {ipc.send('erroselect'); window.location = "../Conta/Conta.html?user="+user;}
        }
      }
    );
    
    var i = 1;

    // Console.log da query.
    request.on("row", columns => {
      columns.forEach(column => {
        dado = ("%s\t%s", /*column.metadata.colName,*/ column.value);
        document.getElementById('input2').readOnly = true;
        document.getElementById('input2').style.color = '#C4C4C4';
        if (column.metadata.colName == 'Saldo' || column.metadata.colName == 'Rendimento') {
          dado = parseFloat(dado).toFixed(2);
          document.getElementById(`input${i}`).value = dado; }
        else {
          document.getElementById(`input${i}`).value = dado; }
        i++;
      });
    });

    connection.execSql(request);
  }
}


var btnCancelar = document.querySelector('.btn-cancelar');
btnCancelar.addEventListener('click', ()=>{
  window.location = "../Conta/Conta.html?user="+user;
})


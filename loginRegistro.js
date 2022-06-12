const { Connection, Request } = require("tedious");
const ipc = require('electron').ipcRenderer


// -------------------------------------- VERIFICAÇÕES/RESTRIÇÕES

// Declaração de Variáveis
var inputnome = document.querySelector('#input-name');
var inputsobrenome = document.querySelector('#input-lastname');
var inputemail = document.querySelector('#input-emailreg');
var inputpw = document.querySelector('#input-pwreg');
var inputconfpw = document.querySelector('#input-confpw');

// Eventos
inputnome.addEventListener('keypress', verificaNomeKey);
inputsobrenome.addEventListener('keypress', verificaSobrenomeKey);
inputemail.addEventListener('keypress', verificaEmailKey);
inputpw.addEventListener('keypress', verificaPWKey);
inputconfpw.addEventListener('keypress', verificaPWKey);
inputconfpw.addEventListener('change', verificaPW);

// Funções
// Impossibilita teclar espaço
function verificaNomeKey (event) {  
  var key = event.keyCode;
   if (key === 32) {
     event.preventDefault();
   }
};

function verificaSobrenomeKey (event) {  
  var key = event.keyCode;
   if (key === 32) {
     event.preventDefault();
   }
};

function verificaEmailKey (event) {  
  var key = event.keyCode;
   if (key === 32) {
     event.preventDefault();
   }
};

function verificaPWKey (event) {  
  var key = event.keyCode;
   if (key === 32) {
     event.preventDefault();
   }
};

function verificaPW () {
  var pw1 = document.querySelector('#input-pwreg').value;
  var pw2 = document.querySelector('#input-confpw').value;
  if (pw1 != pw2) {
    ipc.send('erroconfpw');
  }
  else {
    regUser();
  }
}

// -------------------------------------- FUNCIONALIDADES


function regUser () {
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
            ipc.send('erroinsert');
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
  }

  

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
          ipc.send('errologin');
        }
        else {
          console.log(`${rowCount} linha(s) retornadas`);
          if (rowCount != 1) {ipc.send('errologin');}
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

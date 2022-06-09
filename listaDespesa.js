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
      console.log(err);
    } else {queryDatabase();}
  });

  // Conexão do DB.
  connection.connect();

  // Função de criação de Query.
  function queryDatabase() {
    console.log("Lendo dados da tabela...");

    const request = new Request(
      `SELECT d.CodDespesa, c.Nome, d.Categoria, d.Valor, d.DataDespesa
      FROM dbo.Usuario u
      Inner Join dbo.Conta c ON u.CodUsuario = c.CodUsuario
      Inner Join dbo.Despesa d ON c.CodConta = d.CodConta
      Where u.CodUsuario = \'${user}\'
      Order By d.DataDespesa DESC`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        }
        else {
          console.log(`${rowCount} linha(s) retornadas`);
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
          document.getElementById(`td${i}`).textContent = 'R$ ' + dado;
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

conexao();
conexao1();
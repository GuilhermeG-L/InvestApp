const { Connection, Request } = require("tedious");
const Chart = require('chart.js');
const ipc = require('electron').ipcRenderer

const urlParams = new URLSearchParams(window.location.search);
const user = urlParams.get('user');

ipc.send('msginvestimento');

// -------------------------------------- VERIFICAÇÕES/RESTRIÇÕES

// Declaração de Variáveis
var porcentagem = document.querySelector('#porcentagem-di');
var valor = document.querySelector('#deposito-inicial');

// Eventos
porcentagem.addEventListener('change', verificaPorcentagem);
valor.addEventListener('change', verificaValor);

// Funções
function verificaPorcentagem () {
  let porc = document.querySelector('#porcentagem-di').value;
  if (porc > 999) {
    document.querySelector('#porcentagem-di').value = 999;
  }
  if (porc <= 0) {
    document.querySelector('#porcentagem-di').value = 1;
  }
}

function verificaValor () {
  let val = document.querySelector('#deposito-inicial').value;
  if (val > 9999999999) {
    document.querySelector('#deposito-inicial').value = 9999999999;
  }
  if (val <= 0) {
    document.querySelector('#deposito-inicial').value = 1;
  }
}

// -------------------------------------- FUNCIONALIDADES

var btnSimular = document.querySelector('.btn-simula');
btnSimular.addEventListener('click', ()=>{
  document.querySelector(".area-grafico").innerHTML = '<canvas id="chart" height="240"></canvas>';
  conexao();
});

    function conexao() {
      let valPresente = parseFloat(document.querySelector('#deposito-inicial').value);
      let nomeinvest = document.querySelector('#tipoInvest').value;
      let porcDI = document.querySelector('#porcentagem-di').value;

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
      `SELECT i.Valor
      FROM dbo.Investimento i
      Where i.NomeInvestimento = 'CDI'`, 
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
    var c = document.getElementById("chart");
    var data = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"],
        hoverBackgroundColor: ["#02559e", "#bf3028", "#1f8c2b", "#cc6a14", "#6bb8d6", "#89099c", "#ccb000", "#000f1f", "#2fa8a8", "#02ba52", "#540d2f", "#a30d81", "#265e45", "#111111", "#757575"],
        tension: 0.1,
      }]
    };
    var options = {
      maintainAspectRatio: false,
      cutout: '60%',
      hoverOffset: 10,
      title: {
        display: true,
        text: 'TESTE'
      }
    };
    var opt = {
    
    type: "line",
    data: data,
    options: options
    };
    var chart = new Chart(c,opt);

    Chart.defaults.plugins.legend.display = false

    // Console.log da query.
    request.on("row", columns => {
      columns.forEach(column => {
        dado = ("%s\t%s", /*column.metadata.colName,*/ column.value);
        dado = parseFloat(dado);
        const arrMeses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro','Imposto de Renda']
        var mesAtual = new Date();
        mesAtual = mesAtual.getMonth(); // Pega mês atual
        let n = 0; // Contador de meses
        while (mesAtual < 13) {
          var mes = arrMeses[mesAtual];
          n++;
          //Adicionando os labels no Chart.
          chart.config.data.labels.push(`${mes}`);
          chart.update();
          mesAtual++;
        }
        let valInicial = valPresente; // valor inicial para uso no IR.
        n = n - 2; // contador de meses
        qtdmeses = n; // n° de meses para uso no IR.
        dado = (porcDI/100) * dado;
        while (n > 0) {
          let valMes = valPresente * (1 + dado/100) ** ((1)/12);
          valPresente = valPresente.toFixed(2);
          chart.config.data.datasets[0].data.push(`${valPresente}`);
          chart.update();
          valPresente = valMes;
          n--;
        }

        // Adicionando último mês Pré-IR.
        valPresente = valPresente.toFixed(2);
        chart.config.data.datasets[0].data.push(`${valPresente}`);
        chart.update();
        // Imposto de Renda.
        if (nomeinvest == 'default') {
          ipc.send('erroinvest');
        }
        if (nomeinvest == 'cdb') {
          if (qtdmeses < 6) {
            let IR = 0.225;
            valPresente = valPresente - ((valPresente - valInicial) * IR);
            valPresente = valPresente.toFixed(2);
            chart.config.data.datasets[0].data.push(`${valPresente}`);
            chart.update();
          }
          else {
            let IR = 0.2;
            valPresente = valPresente - ((valPresente - valInicial) * IR);
            valPresente = valPresente.toFixed(2);
            chart.config.data.datasets[0].data.push(`${valPresente}`);
            chart.update();
          }
        }
      });
    });

    connection.execSql(request);
  }}

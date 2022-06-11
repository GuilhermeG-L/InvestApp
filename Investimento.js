const { Connection, Request } = require("tedious");
const Chart = require('chart.js');
const ipc = require('electron').ipcRenderer

const urlParams = new URLSearchParams(window.location.search);
const teste = urlParams.get('teste'); // TIRAR TESTE DEPOIS
const user = urlParams.get('user');

console.log(user);
console.log(teste);

ipc.send('msginvestimento');


var btnSimular = document.querySelector('.btn-simula');
btnSimular.addEventListener('click', ()=>{
  document.querySelector(".area-grafico").innerHTML = '<canvas id="chart"></canvas>';
  conexao();
});

    function conexao() {
      let valPresente = parseFloat(document.querySelector('#deposito-inicial').value);
      let nomeinvest = document.querySelector('#tipoInvest').value;

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
      Where i.NomeInvestimento = \'${nomeinvest}\'`, 
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
        hoverBackgroundColor: ["#02559e", "#bf3028", "#1f8c2b", "#cc6a14", "#6bb8d6", "#89099c", "#ccb000", "#000f1f", "#2fa8a8", "#02ba52", "#540d2f", "#a30d81", "#265e45", "#111111", "#757575"]
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

    Chart.overrides.doughnut.plugins.legend.display = true
    Chart.overrides.doughnut.plugins.legend.position = 'bottom'

    // Console.log da query.
    request.on("row", columns => {
      columns.forEach(column => {
        dado = ("%s\t%s", /*column.metadata.colName,*/ column.value);
        dado = parseFloat(dado);
        console.log(dado);
        const arrMeses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
        var mesAtual = new Date();
        mesAtual = mesAtual.getMonth(); // Pega mês atual
        let n = 0; // Contador de meses
        while (mesAtual < 12) {
          var mes = arrMeses[mesAtual];
          n++;
          //Adicionando os labels no Chart.
          chart.config.data.labels.push(`${mes}`);
          chart.update();
          mesAtual++;
        }
        n = n - 1; // n° de meses
        let valFuturo = valPresente * (1 + dado/100) ** (n/10); // Fórmula Juros Compostos
        let ganhoMensal = (valFuturo - valPresente)/n; // Lucro mensal
        while (n > -1) {
          //Adicionando os dados numéricos no Chart.
          chart.config.data.datasets[0].data.push(`${valPresente}`);
          chart.update();
          valPresente = valPresente + ganhoMensal;
          n--;
        }
      });
    });

    connection.execSql(request);
  }}

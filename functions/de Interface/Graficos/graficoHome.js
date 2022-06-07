const randomNum = () => Math.floor(Math.random() * (235-52+1)+52)
const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`

var arrLabels = ['Refeições', 'Transporte', 'Eletrônico', 'Viagens']
var arrDados = [250,75, 1231, 8983]
var arrCores =  [
    randomRGB(), randomRGB(), randomRGB(), randomRGB(), 
    randomRGB(), randomRGB(), randomRGB(), randomRGB(), 
    randomRGB(), randomRGB(), randomRGB(), randomRGB(), 
    randomRGB(), randomRGB(), randomRGB(), randomRGB(), 
    randomRGB(), randomRGB(), randomRGB(), randomRGB(), 
    randomRGB(), randomRGB(), randomRGB(), randomRGB(), 
    randomRGB(), randomRGB(), randomRGB(), randomRGB()
]

const data = {
    labels:arrLabels,
    datasets: [{
        data: arrDados,
    backgroundColor: arrCores,
    borderWidth:0
    }]
}

const opcoes = {
    layout:{
        padding: 0
    }
}

const plgs = [

]

const config = {
    type: 'doughnut',
    data: data,
    options: opcoes,
    plugins: plgs,
}

Chart.overrides.doughnut.plugins.legend.display = true
Chart.overrides.doughnut.plugins.legend.position = 'left'

const grafico = new Chart(document.getElementById('myChart'), config)
const ipc = require('electron').ipcRenderer;


var segundos = 0;
document.addEventListener('mousemove', ()=>{
    segundos = 0
})

document.addEventListener('keypress', ()=>{
    segundos = 0
})

function timerIncrement(){
    segundos++
    if(segundos > 300){
        var inatividade = 'inatividade';
        window.location = '../LoginRegistro/loginRegistro.html?inatividade='+inatividade;
    }
}

setInterval(timerIncrement, 1000)
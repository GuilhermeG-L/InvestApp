const ipc = require('electron').ipcRenderer;

// $(document).ready(function() {
//     //Incrementa o tempo de inatividade
//     var inatividade = setInterval(timerIncrement, 1000); 

//     //Zera o tempo de inatividade
//     $(this).mousemove(function(e) {
//         segundos = 0;
//         console.log("Mouse movimentado.");
//     });

//     $(this).keypress(function(e) {
//         segundos = 0;
//         console.log("Tecla pressionada.");
//     });
// });

// function timerIncrement() {
//     segundos++;
//     console.log(segundos + " segundo(s) de inatividade.");
//     if (segundos > 5) { 
//         alert('Usuário inativo')
//     }
// }


var segundos = 0;
document.addEventListener('mousemove', ()=>{
    segundos = 0
})

document.addEventListener('keypress', ()=>{
    console.log('Tecla apertada')
    segundos = 0
})

function timerIncrement(){
    segundos++
    console.log(`Tempo de inatividade: ${segundos}s`)
    if(segundos > 300){
        var inatividade = 'inatividade';
        window.location = '../LoginRegistro/loginMobile.html?inatividade='+inatividade;
    }
}

setInterval(timerIncrement, 1000)
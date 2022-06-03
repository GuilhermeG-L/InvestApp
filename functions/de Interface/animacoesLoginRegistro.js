var cd = document.querySelector('.direita')
var primeiroConteudo = document.querySelector('.primeiroConteudo')
var segundoConteudo = document.querySelector('.segundoConteudo')
var linkRegistro = document.querySelector('.link-registro')
var linkLogin = document.querySelector('.link-login')


linkRegistro.addEventListener('click', ()=>{
    primeiroConteudo.style.animationName = 'someConteudo'
    segundoConteudo.style.animationName = 'apareceConteudo'
    cd.style.animationName = 'movimentaContainer'

    cd.style.animationPlayState = 'running'
    primeiroConteudo.style.animationPlayState = 'running'
    segundoConteudo.style.animationPlayState = 'running'
    setTimeout(()=>{console.log(segundoConteudo)}, 3000)

})

linkLogin.addEventListener('click', ()=>{
    cd.style.animationPlayState = 'paused'
    cd.style.animationName = 'retornaContainer'
    cd.style.animationPlayState = 'running'
    
    // primeiroConteudo.style.animationName = 'apareceConteudo'
    // segundoConteudo.style.animationName = 'someConteudo'
    // cd.style.animationName = 'retornaContainer'

    // cd.style.animationPlayState = 'running'
    // primeiroConteudo.style.animationPlayState = 'running'
    // segundoConteudo.style.animationPlayState = 'running'
    setTimeout(()=>{console.log(cd.style.animationName  )}, 3000)

})

var cd = document.querySelector('.direita')
var primeiroConteudo = document.querySelector('.primeiroConteudo')
var segundoConteudo = document.querySelector('.segundoConteudo')
var linkRegistro = document.querySelector('.link-registro')
var linkLogin = document.querySelector('.link-login')


linkRegistro.addEventListener('click', ()=>{
    cd.style.right = '0'

    cd.style.animationPlayState = 'paused'
    cd.style.animationName = 'movimentaContainer'
    
    primeiroConteudo.style.animationName = 'someConteudo'
    segundoConteudo.style.animationName = 'apareceConteudo'

    primeiroConteudo.style.opacity = '100'
    primeiroConteudo.style.animatinDuration = '1s'
    primeiroConteudo.style.animationDelay = '1s'
    
    segundoConteudo.style.opacity = '0'
    segundoConteudo.style.animationDuration = '2s'
    segundoConteudo.style.animationDelay = '4s'


    primeiroConteudo.style.animationPlayState = 'running'
    cd.style.animationPlayState = 'running'
    segundoConteudo.style.animationPlayState = 'running'
    // console.log(`Left: ${cd.style.left}`)
    // console.log(`Right: ${cd.style.right}`)
    // setTimeout(()=>{console.log(cd.style.animationName  )}, 3000)
    console.log('Voltou para o login')


    // primeiroConteudo.style.animationName = 'someConteudo'
    // segundoConteudo.style.animationName = 'apareceConteudo'
    // cd.style.animationName = 'movimentaContainer'

    // cd.style.animationPlayState = 'running'
    // primeiroConteudo.style.animationPlayState = 'running'
    // segundoConteudo.style.animationPlayState = 'running'
    // setTimeout(()=>{console.log(segundoConteudo)}, 3000)

})

linkLogin.addEventListener('click', ()=>{
    cd.style.right = '50%'

    cd.style.animationPlayState = 'paused'
    cd.style.animationName = 'retornaContainer'
    
    primeiroConteudo.style.animationName = 'apareceConteudo'
    segundoConteudo.style.animationName = 'someConteudo'

    primeiroConteudo.style.opacity = '0'
    primeiroConteudo.style.animatinDuration = '2s'
    primeiroConteudo.style.animationDelay = '4s'
    
    segundoConteudo.style.opacity = '100'
    segundoConteudo.style.animationDuration = '1s'
    segundoConteudo.style.animationDelay = '1s'


    segundoConteudo.style.animationPlayState = 'running'
    cd.style.animationPlayState = 'running'
    primeiroConteudo.style.animationPlayState = 'running'
    // console.log(`Left: ${cd.style.left}`)
    // console.log(`Right: ${cd.style.right}`)
    // setTimeout(()=>{console.log(cd.style.animationName  )}, 3000)
    console.log('Voltou para o login')
})

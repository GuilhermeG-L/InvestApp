// Criação dos itens
var menuLateral = document.createElement('div')
var btnLogo = document.createElement('img')
var btnAdd = document.createElement('img')
var btnReceitasDespesas = document.createElement('img')
var btnBancos = document.createElement('img')
var btnRelatorios = document.createElement('img')
var btnInvestimento = document.createElement('img')
var btnLogOff = document.createElement('img')

// Atribuição de classes e Srcs

btnLogo.src = '../../midia/icons/Logo reduzido.png'
btnAdd.src = '../../midia/icons/btn Mais.png'
btnReceitasDespesas.src = '../../midia/icons/btn ReceitasDespesas.png'
btnBancos.src = '../../midia/icons/btn ContasBancarias.png'
btnRelatorios.src = '../../midia/icons/btn Relatorios.png'
btnInvestimento.src = '../../midia/icons/btn Investimento.png'
btnLogOff.src = '../../midia/icons/btn LogOff.png'

menuLateral.classList = 'menuLateral'
btnLogo.classList = 'btnLogo'
btnAdd.classList = 'btnAdd'
btnReceitasDespesas.classList = 'btnReceitasDespesas'
btnBancos.classList = 'btnBancos'
btnRelatorios.classList = 'btnRelatorios'
btnInvestimento.classList = 'btnInvestimento'
btnLogOff.classList = 'btnLogOff'

// Atribuição de links

// btnLogo.addEventListener('click', ()=> {
//     window.location = // Nome da página
// })

// btnAdd.addEventListener('click', ()=> {
//     window.location = // Nome da página
// })

// btnReceitasDespesas.addEventListener('click', ()=> {
//     window.location = // Nome da página
// })

// btnBancos.addEventListener('click', ()=> {
//     window.location = // Nome da página
// })

// btnRelatorios.addEventListener('click', ()=> {
//     window.location = // Nome da página
// })

// btnInvestimento.addEventListener('click', ()=> {
//     window.location = // Nome da página
// })

// btnLogOff.addEventListener('click', ()=> {
//     window.location = // Nome da página
// })

// Appends
menuLateral.append(btnLogo)
menuLateral.append(btnAdd)
menuLateral.append(btnReceitasDespesas)
menuLateral.append(btnBancos)
menuLateral.append(btnRelatorios)
menuLateral.append(btnInvestimento)
menuLateral.append(btnLogOff)

document.body.append(menuLateral)
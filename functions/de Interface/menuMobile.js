// Criação dos itens
var menuMobile = document.createElement('div')
var btnHome = document.createElement('img')
var btnReceitasDespesas = document.createElement('img')
var btnBancos = document.createElement('img')
var btnRelatorios = document.createElement('img')
var btnInvestimento = document.createElement('img')

// Atribuição de classes e Srcs

btnHome.src = '../../midia/icons/btn Home Mobile.png'
btnReceitasDespesas.src = '../../midia/icons/btn ReceitasDespesas.png'
btnBancos.src = '../../midia/icons/btn ContasBancarias.png'
btnRelatorios.src = '../../midia/icons/btn Relatorios.png'
btnInvestimento.src = '../../midia/icons/btn Investimento.png'

menuMobile.classList = 'menuMobile'
btnHome.classList = 'btnHome'
btnReceitasDespesas.classList = 'btnReceitasDespesas'
btnBancos.classList = 'btnBancos'
btnRelatorios.classList = 'btnRelatorios'
btnInvestimento.classList = 'btnInvestimento'

// Atribuição de links

// btnLogo.addEventListener('click', ()=> {
//     window.location = // Nome da página
// })

// btnHome.addEventListener('click', ()=> {
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


// Appends

menuMobile.append(btnReceitasDespesas)
menuMobile.append(btnBancos)
menuMobile.append(btnHome)
menuMobile.append(btnRelatorios)
menuMobile.append(btnInvestimento)

document.body.append(menuMobile)
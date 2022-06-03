// Criação dos itens

var menuLat = document.createElement('div')
var btnLogo = document.createElement('img')
var btnAdd = document.createElement('img')
var btnTransacoes = document.createElement('img')
var btnBancos = document.createElement('img')
var btnRelatorios = document.createElement('img')
var btnInvestimento = document.createElement('img')
var btnLogOff = document.createElement('img')

// Atribuição de classes

menuLat.classList = 'menuLateral'
btnLogo.classList = 'btnLogo'
btnAdd.classList = 'btnAdd'
btnTransacoes.classList = 'btnReceitasDespesas'
btnBancos.classList = 'btnBancos'
btnRelatorios.classList = 'btnRelatorios'
btnInvestimento.classList = 'btnInvestimento'
btnLogOff.classList = 'btnLogOff'

// Atribuição de SRC para as imagens
btnLogo.src = '../../midia/icons/Logo reduzido.png'
btnAdd.src = '../../midia/icons/btn Mais.png'
btnTransacoes.src = '../../midia/icons/btn ReceitasDespesas.png'
btnBancos.src = '../../midia/icons/btn ContasBancarias.png'
btnRelatorios.src = '../../midia/icons/btn Relatorios.png'
btnInvestimento.src = '../../midia/icons/btn Investimento.png'
btnLogOff.src = '../../midia/icons/btn LogOff.png'

// Append dos elementos no Menu Lateral

menuLat.append(btnLogo)
menuLat.append(btnAdd)
menuLat.append(btnTransacoes)
menuLat.append(btnBancos)
menuLat.append(btnRelatorios)
menuLat.append(btnInvestimento)
menuLat.append(btnLogOff)

// Append do Menu Lateral no Body
document.body.append(menuLat)
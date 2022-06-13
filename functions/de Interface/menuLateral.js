// Função para pegar o titulo da página
function tituloPagina(){
    return document.title
}

// Função para pegar código de usuário

const urlParams = new URLSearchParams(window.location.search);
const teste = urlParams.get('teste'); // TIRAR TESTE DEPOIS
const user = urlParams.get('user');


// Criação dos itens

var menuLat = document.createElement('div')
var btnLogo = document.createElement('img')
var btnTransacoes = document.createElement('img')
var btnBancos = document.createElement('img')
var btnRelatorios = document.createElement('img')
var btnInvestimento = document.createElement('img')
var btnLogOff = document.createElement('img')



// Atribuição de classes

menuLat.classList = 'menuLateral btnMenuLateral'
btnLogo.classList = 'btnLogo btnMenuLateral'
btnTransacoes.classList = 'btnReceitasDespesas btnMenuLateral'
btnBancos.classList = 'btnBancos btnMenuLateral'
btnRelatorios.classList = 'btnRelatorios btnMenuLateral'
btnInvestimento.classList = 'btnInvestimento btnMenuLateral'
btnLogOff.classList = 'btnLogOff'

// Atribuição de titles

btnTransacoes.title = 'Receitas e Despesas'
btnBancos.title = 'Contas'
btnRelatorios.title = 'Relatórios'
btnInvestimento.title = 'Simulação de Investimento'
btnLogOff.title = 'LogOff'

// Atribuição de SRC para as imagens
btnLogo.src = '../../midia/icons/Logo reduzido.png'
btnTransacoes.src = '../../midia/icons/btn ReceitasDespesas.png'
btnBancos.src = '../../midia/icons/btn ContasBancarias.png'
btnRelatorios.src = '../../midia/icons/btn Relatorios.png'
btnInvestimento.src = '../../midia/icons/btn Investimento.png'
btnLogOff.src = '../../midia/icons/btn LogOff.png'

function paginaAtiva(){
    var pagAtiva = tituloPagina()
    switch(pagAtiva){
        case 'Dashboard':
            console.log('Dashboard')
            break
        case 'Despesas':
        case 'Receitas':
            btnTransacoes.src = "../../midia/icons/btn ReceitasDespesas ativo.png"
            break
        case 'Contas':
            btnBancos.src = "../../midia/icons/btn ContasBancarias ativo.png"
            break
        case 'Relatórios':
            btnRelatorios.src = "../../midia/icons/btn Relatorios ativo"
            break
        case 'Investimentos':
            btnInvestimento.src = "../../midia/icons/btn Investimento ativo.png"
            break
        default:
            console.log('Erro!')
            break
    }
}

paginaAtiva()

// Append dos elementos no Menu Lateral

menuLat.append(btnLogo)
menuLat.append(btnTransacoes)
menuLat.append(btnBancos)
menuLat.append(btnRelatorios)
menuLat.append(btnInvestimento)
menuLat.append(btnLogOff)

// Append do Menu Lateral no Body
document.body.append(menuLat)

// Atribuição dos redirecionamentos
btnLogo.addEventListener('click', ()=>{
    window.location = "../Home/home.html?user="+user + "&teste="+teste; // TIRAR TESTE DEPOIS
})

btnTransacoes.addEventListener('click', ()=>{
    window.location = "../ReceitasDespesas/receitas.html?user="+user + "&teste="+teste; // TIRAR TESTE DEPOIS
})

btnBancos.addEventListener('click', ()=>{
    window.location = "../Conta/Conta.html?user="+user + "&teste="+teste; // TIRAR TESTE DEPOIS
})

btnRelatorios.addEventListener('click', ()=>{
    window.location = "../Relatorios/relatorios.html?user="+user + "&teste="+teste; // TIRAR TESTE DEPOIS
})

btnInvestimento.addEventListener('click', ()=>{
    window.location = "../Investimentos/investimentos.html?user="+user + "&teste="+teste; // TIRAR TESTE DEPOIS
})

btnLogOff.addEventListener('click', ()=>{
    window.location = "../LoginRegistro/loginMobile.html";
})


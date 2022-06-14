const electron = require('electron');
const app=electron.app;
const BrowserWindow=electron.BrowserWindow;
const ipcMain=electron.ipcMain;

const path=require('path');
const url=require('url');

const dialog = electron.dialog

let win;

function createWindow(){
    win=new BrowserWindow({
        minWidth: 1280,
        minHeight: 720,
        icon: './midia/icons/png/Logo reduzido.png',
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js")
        }
    });
    win.setMenuBarVisibility(false);
    win.maximize();
    win.loadURL(url.format({
        pathname: path.join(__dirname, './pages/LoginRegistro/loginRegistro.html'),
        protocol: 'file',
        slashes: true
    }));

    win.on('close', function(){
        win=null
    });
}

app.on('ready', createWindow);

ipcMain.on('erroinvest', function (event) {
    dialog.showErrorBox ('Erro no cálculo do investimento! ','Certifique-se de selecionar um tipo de investimento válido.')
})

ipcMain.on('erroinatividade', function (event) {
    dialog.showErrorBox ('Você foi desconectado por inatividade! ','Evite permanecer inativo por mais de 5 minutos.')
})

ipcMain.on('erromincontas', function (event) {
    dialog.showErrorBox ('Você precisa ter ao menos uma conta para acessar essa área! ','Crie uma conta na área de Contas Bancárias e tente novamente.')
})

ipcMain.on('erroqtdcontas', function (event) {
    dialog.showErrorBox ('Limite de contas atingido! ','Temporariamente, o InvestApp está permitindo somente 4 contas por usuário.')
})

ipcMain.on('erroconfpw', function (event) {
    dialog.showErrorBox ('Senhas diferentes inseridas! ','Insira a mesma senha nos dois campos.')
})

ipcMain.on('erroconexao', function (event) {
    dialog.showErrorBox ('Não foi possível conectar ao Servidor! ','Verifique sua conexão de internet e tente novamente.')
})

ipcMain.on('errologin', function (event) {
    dialog.showErrorBox ('Login inválido! ','Verifique os dados inseridos e tente novamente.')
})

ipcMain.on('erroselect', function (event) {
    dialog.showErrorBox ('Não foi possível localizar os dados! ','Verifique se os dados existem e estão corretos.')
})

ipcMain.on('erroinsert', function (event) {
    dialog.showErrorBox ('Não foi possível inserir os dados! ','Verifique se os dados estão corretos e se todos os campos necessários foram preenchidos.')
})

ipcMain.on('erroupdate', function (event) {
    dialog.showErrorBox ('Não foi possível atualizar os dados! ','Verifique se os dados estão corretos e se todos os campos necessários foram preenchidos.')
})

ipcMain.on('errodelete', function (event) {
    dialog.showErrorBox ('Não foi possível deletar os dados! ','Verifique se os dados existem e estão corretos.')
})

const options = {
    type: 'warning',
    title: 'AVISO!',
    buttons: ['OK'],
    message: 'As Simulações de Investimento pós-fixadas do InvestApp, apesar de baseadas em dados reais atualizados periodicamente, são totalmente ilustrativas e de cunho comparativo, podendo não representar fielmente o retorno de um investimento em determinado banco, securitizadora, ou agência de valores sob condições específicas.'
  };

ipcMain.on('msginvestimento', function (event) {
    dialog.showMessageBox (null, options)
})

const options2 = {
    type: 'warning',
    title: 'RECUPERAÇÃO DE SENHA!',
    buttons: ['OK'],
    message: 'Para recuperar sua senha, envie um e-mail através de seu e-mail registrado para investapprec@gmail.com com o título "Quero recuperar minha senha!"'
  };

ipcMain.on('msgrecpw', function (event) {
    dialog.showMessageBox (null, options2)
})



/*
const { app, BrowserWindow } = require('electron')

function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
    })
  
    win.loadFile('index.html')
  }

  app.whenReady().then(() => {
    createWindow()
    
  }) */

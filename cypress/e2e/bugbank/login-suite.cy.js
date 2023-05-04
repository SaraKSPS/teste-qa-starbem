const loginPage = require('../../pages/login.page');
const extractPage = require('../../pages/extract.page');
const transferPage = require('../../pages/transfer.page');
const homePage = require('../../pages/home.page');
const { createAccount } = require('../../support/utils');
const { user1 } = require('../../fixtures/user-data.json');

describe('Tela de Login de usuário', () => {

    beforeEach(() => {
        loginPage.openPage();
    });

    it('Tentar fazer login sem e-mail', () => {
        loginPage.verifyLoginWithoutEmail(user1.password);

    });
    it('Tentar fazer login com senha incorreta', () => {
        createAccount(user1.email, user1.name, user1.password, true, 'account1');
        loginPage.verifyLoginWrongPassword(user1.email, '00');

    });
    it('Tentar fazer login sem senha', () => {
        createAccount(user1.email, user1.name, user1.password, true, 'account1');
        loginPage.verifyLoginWithoutPassword(user1.email);
    });

    it('Verificar funcionamento do botão de visualizar/esconder senha na tela de Login', () => {
        loginPage.fillLoginAndPassword(user1.email, user1.password);
        // Clicar para mostrar a senha
        loginPage.clickViewOrHidePassword();
        loginPage.verifyPasswordField('text');
        // Clicar para esconder a senha
        loginPage.clickViewOrHidePassword();
        loginPage.verifyPasswordField('password');
    });

    it('Verificar se usuário foi redirecionado ao tentar abrir a home sem efetuar login', () => {
        homePage.openPage();
        loginPage.verifyLoginUrl();
    });

    it('Verificar se usuário foi redirecionado ao tentar abrir o extrato sem efetuar login', () => {
        extractPage.openPage();
        loginPage.verifyLoginUrl();
    });

    it('Verificar se usuário foi redirecionado ao tentar abrir a página de transferência sem efetuar login', () => {
        transferPage.openPage();
        loginPage.verifyLoginUrl();
    });


});
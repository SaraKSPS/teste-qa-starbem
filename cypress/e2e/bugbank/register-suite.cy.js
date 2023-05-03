const registerPage = require('../../pages/register.page');
const loginPage = require('../../pages/login.page');
const homePage = require('../../pages/home.page');
const { createAccount } = require('../../support/utils');

describe('Cadastramento de usuário', () => {

    beforeEach(() => {
        loginPage.openPage();
    });

    it('Criar conta com saldo e verificar saldo, nome e número da conta', () => {
        // Criar conta 1
        createAccount('star1@bem.com', 'Star', 'bem2023', true, 'account1');

        loginPage.login('star1@bem.com', 'bem2023');
        cy.get('@account1').then(account => {
            homePage.verifyAccountInformation('1.000,00', 'Star', account);
        });

    });
    it('Criar conta sem saldo e verificar saldo, nome e número da conta', () => {
        // Criando conta 1
        createAccount('star1@bem.com', 'Star', 'bem2023', false, 'account1');
        loginPage.login('star1@bem.com', 'bem2023');
        cy.get('@account1').then(account => {
            homePage.verifyAccountInformation('0,00', 'Star', account);
        });

    });

    it('Verificar mensagem de erro ao tentar criar uma conta sem email', () => {
        loginPage.clickRegister();
        registerPage.verifyErrorWithoutEmail('Star', 'bem2023', 'bem2023');
    });

    it('Verificar mensagem de erro ao criar uma conta sem senha', () => {
        loginPage.clickRegister();
        registerPage.verifyErrorWithoutPassword('star@bem.com', 'Star', 'bem2023');
    });

    it('Verificar mensagem de erro ao criar uma conta sem a confirmação de senha', () => {
        loginPage.clickRegister();
        registerPage.verifyErrorWithoutConfirmationPassword('star@bem.com', 'Star', 'bem2023');

    });
    it('Tentar criar conta com senhas diferentes e verificar mensagem de erro', () => {
        loginPage.clickRegister();
        registerPage.verifyErrorUsingDifferentPasswords('star@bem.com', 'Star', 'bem2023', 'bem2024');

    });
    it('Tentar criar conta com email inválido e verificar mensagem de erro', () => {
        loginPage.clickRegister();
        registerPage.verifyErrorUsingInvalidEmail('star@@bem.com', 'Star', 'bem2023', 'bem2024');

    });
    it('Clicar no botão voltar da página "Registrar" e verificar que a página Login é mostrada', () => {
        loginPage.clickRegister();
        registerPage.clickBackButton();
        loginPage.verifyLoginPageDisplayed();
     });

    it('Verificar erro esperado na criação de contas com o mesmo email', () => {
        // criando conta 1
        createAccount('star1@bem.com', 'Star', 'bem2023', true, 'account1');
        
        // criando conta 2
        loginPage.clickRegister();
        registerPage.verifyErrorUsingSameEmail('star1@bem.com', 'Star', 'bem2023', 'bem2023');
        loginPage.closePopup();

    });
    it('Verificar botão de visualizar senha ao criar conta', () => {
        // criando conta 1
        loginPage.clickRegister();
        registerPage.fillRegisterData('star1@bem.com', 'Star', 'bem2023', 'bem2023');
        registerPage.clickViewOrHidePasswordAndConfirmation();
        registerPage.verifyPasswordAndConfirmationFields('text');
        registerPage.clickViewOrHidePasswordAndConfirmation();
        registerPage.verifyPasswordAndConfirmationFields('password');

    });

});
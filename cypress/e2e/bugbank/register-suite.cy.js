const registerPage = require('../../pages/register.page');
const loginPage = require('../../pages/login.page');
const homePage = require('../../pages/home.page');
const { createAccount } = require('../../support/utils');
const { user1 } = require('../../fixtures/user-data.json');

describe('Cadastramento de usuário', () => {

    beforeEach(() => {
        loginPage.openPage();
    });

    it('Criar conta com saldo e verificar saldo, nome e número da conta', () => {
        // Criar conta 1
        createAccount(user1.email, user1.name, user1.password, true, 'account1');
        loginPage.login(user1.email, user1.password);
        cy.get('@account1').then(account => {
            homePage.verifyAccountInformation('1.000,00', user1.name, account);
        });

    });
    it('Criar conta sem saldo e verificar saldo, nome e número da conta', () => {
        // Criando conta 1
        createAccount(user1.email, user1.name, user1.password, true, 'account1');
        loginPage.login(user1.email, user1.password);
        cy.get('@account1').then(account => {
            homePage.verifyAccountInformation('0,00', user1.name, account);
        });

    });

    it('Verificar mensagem de erro ao tentar criar uma conta sem email', () => {
        loginPage.clickRegister();
        registerPage.verifyErrorWithoutEmail(user1.name, user1.password, user1.password);
    });

    it('Verificar mensagem de erro ao criar uma conta sem senha', () => {
        loginPage.clickRegister();
        registerPage.verifyErrorWithoutPassword(user1.email, user1.name, user1.password);
    });

    it('Verificar mensagem de erro ao criar uma conta sem a confirmação de senha', () => {
        loginPage.clickRegister();
        registerPage.verifyErrorWithoutConfirmationPassword(user1.email, user1.name, user1.password);

    });
    it('Tentar criar conta com senhas diferentes e verificar mensagem de erro', () => {
        loginPage.clickRegister();
        registerPage.verifyErrorUsingDifferentPasswords(user1.email, user1.name, user1.password, 'bem2024');

    });
    it('Tentar criar conta com email inválido e verificar mensagem de erro', () => {
        loginPage.clickRegister();
        registerPage.verifyErrorUsingInvalidEmail('star@@bem.com', user1.name, user1.password, 'bem2024');

    });
    it('Clicar no botão voltar da página "Registrar" e verificar que a página Login é mostrada', () => {
        loginPage.clickRegister();
        registerPage.clickBackButton();
        loginPage.verifyLoginPageDisplayed();
    });

    it('Verificar erro esperado na criação de contas com o mesmo email', () => {
        // criando conta 1
        createAccount(user1.email, user1.name, user1.password, true, 'account1');

        // tentar criar conta 2
        loginPage.clickRegister();
        registerPage.verifyErrorUsingSameEmail(user1.email, user1.name, user1.password, user1.password);
        loginPage.closePopup();

    });
    it('Verificar botão de visualizar senha ao criar conta', () => {
        // criando conta 1
        loginPage.clickRegister();
        registerPage.fillRegisterData(user1.email, user1.name, user1.password, user1.password);
        registerPage.clickViewOrHidePasswordAndConfirmation();
        registerPage.verifyPasswordAndConfirmationFields('text');
        registerPage.clickViewOrHidePasswordAndConfirmation();
        registerPage.verifyPasswordAndConfirmationFields('password');

    });

});
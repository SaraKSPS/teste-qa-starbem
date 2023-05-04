const loginPage = require('../../pages/login.page');
const registerPage = require('../../pages/register.page');
const homePage = require('../../pages/home.page');
const transferPage = require('../../pages/transfer.page');
const extractPage = require('../../pages/extract.page');
const { createAccount } = require('../../support/utils');
const { user1, user2 } = require('../../fixtures/user-data.json');

describe('Transferência de valores entre usuários', () => {
    beforeEach(() => {
        loginPage.openPage();
    });

    it('Criar contas, transferir com descrição e verificar valores no saldo e extrato de ambas as contas', () => {
        // criando contas 1 e 2
        createAccount(user1.email, user1.name, user1.password, true, 'account1');
        // passando true novamente para clicar no botão e não criar a conta com saldo, 
        // dado que o botão aparece já clicado por ter criado uma conta anteriormente
        createAccount(user2.email, user2.name, user2.password, true, 'account2');

        // login com a conta 1
        loginPage.login(user1.email, user1.password);
        homePage.clickToTransferPage();
        cy.get('@account2').then(account2 => {

            // transferir para conta 2
            const splittedAccount = account2.split('-');
            transferPage.transferToAnotherAccount(splittedAccount[0], splittedAccount[1], '1000', 'test');
            transferPage.verifyTransferModal();
            transferPage.closeModal();
            transferPage.backToHomePage();

            // verificar saldo da conta 1
            homePage.verifyBalance('0,00');

            // verificar extrado da conta 1
            homePage.clickToExtractPage();
            extractPage.verifyTransactionSent('0,00', 'test', '1.000,00');
            homePage.clickLogout();

            //verificar extrato da conta 2
            loginPage.login(user2.email, user2.password);
            homePage.clickToExtractPage();
            extractPage.verifyTransactionReceived('1.000,00', 'test', '1.000,00');
            homePage.verifyBalance('1.000,00');

        });
    });

    it('Tentar transferir valor maior que o saldo', () => {
        // criando contas 1 e 2
        createAccount(user1.email, user1.name, user1.password, true, 'account1');
        createAccount(user2.email, user2.name, user2.password, false, 'account2');

        // login com a conta 1
        loginPage.login(user1.email, user1.password);
        homePage.clickToTransferPage();
        cy.get('@account2').then(account2 => {

            const splittedAccount = account2.split('-');
            transferPage.transferToAnotherAccount(splittedAccount[0], splittedAccount[1], '1400', 'test');
            transferPage.verifyHigherBalanceModal();

        });

    });
    it('Tentar transferir para uma conta inexistente', () => {
        // criando conta 1
        createAccount(user1.email, user1.name, user1.password, true, 'account1');

        // login com a conta 1
        loginPage.login(user1.email, user1.password);
        homePage.clickToTransferPage();
        transferPage.transferToAnotherAccount('000', '0', '1000', 'test');

        transferPage.verifyInvalidAccountModal();

    });
    it('Tentar transferir sem informar uma conta', () => {
        // criando conta 1 
        createAccount(user1.email, user1.name, user1.password, true, 'account1');

        // login
        loginPage.login(user1.email, user1.password);
        homePage.clickToTransferPage();
        transferPage.transferJustTheValue('1000');

        transferPage.verifyInvalidAccountModal();

    });
    it('Tentar transferir para a mesma conta', () => {
        // criando conta 1
        createAccount(user1.email, user1.name, user1.password, true, 'account1');

        // login
        loginPage.login(user1.email, user1.password);
        homePage.clickToTransferPage();
        cy.get('@account1').then(account1 => {

            cy.log(account1);
            const splittedAccount = account1.split('-');
            transferPage.transferToAnotherAccount(splittedAccount[0], splittedAccount[1], '1000', 'test');

            transferPage.verifyTransferSameAccountModal();
        });

    });
    it('Tentar transferir para outra conta com valor negativo', () => {
        // criando contas 1 e 2
        createAccount(user1.email, user1.name, user1.password, true, 'account1');
        createAccount(user2.email, user2.name, user2.password, false, 'account2');

        // login
        loginPage.login(user1.email, user1.password);
        homePage.clickToTransferPage();
        cy.get('@account2').then(account2 => {

            cy.log(account2);
            const splittedAccount = account2.split('-');
            transferPage.transferToAnotherAccount(splittedAccount[0], splittedAccount[1], '-14', 'test');

            transferPage.verifyTransferNegativeModal();
        });
    });

    it('Tentar transferir para outra conta com valor zero', () => {
        // criando contas 1 e 2
        createAccount(user1.email, user1.name, user1.password, true, 'account1');
        createAccount(user2.email, user2.name, user2.password, false, 'account2');

        // login
        loginPage.login(user1.email, user1.password);
        homePage.clickToTransferPage();
        cy.get('@account2').then(account2 => {

            cy.log(account2);
            const splittedAccount = account2.split('-');
            transferPage.transferToAnotherAccount(splittedAccount[0], splittedAccount[1], '0', 'test');

            transferPage.verifyTransferNegativeModal();
        });
    });

    it('Verificar mensagem de erro ao tentar inserir texto no lugar do valor', () => {
        // criando contas 1 e 2
        createAccount(user1.email, user1.name, user1.password, true, 'account1');
        createAccount(user2.email, user2.name, user2.password, false, 'account2');

        // login
        loginPage.login(user1.email, user1.password);
        homePage.clickToTransferPage();
        cy.get('@account2').then(account2 => {
            cy.log(account2);
            const splittedAccount = account2.split('-');
            transferPage.transferToAnotherAccount(splittedAccount[0], splittedAccount[1], 'test', 'test');
        });
        transferPage.verifyMessageOnlyNumbersAllowedError();

    });
    it('Realizar transferência sem descrição', () => {
        // criando contas 1 e 2
        createAccount(user1.email, user1.name, user1.password, true, 'account1');
        createAccount(user2.email, user2.name, user2.password, true, 'account2');

        // login com a conta 1
        loginPage.login(user1.email, user1.password);
        homePage.clickToTransferPage();

        cy.get('@account2').then(account2 => {

            // transferir para conta 2
            cy.log(account2);
            const splittedAccount = account2.split('-');
            transferPage.transferToAnotherAccountWithoutDescription(splittedAccount[0], splittedAccount[1], '1000');
            transferPage.closeModal();
            transferPage.backToHomePage();

            // verificar extrado da conta 1
            homePage.clickToExtractPage();
            extractPage.verifyEmptyDescription();
            extractPage.clickLogout();

            //verificar extrato da conta 2
            loginPage.login(user2.email, user2.password);
            homePage.clickToExtractPage();
            extractPage.verifyEmptyDescription();
        });

    });

});
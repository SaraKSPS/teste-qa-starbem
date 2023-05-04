const loginPage = require('../../pages/login.page');
const registerPage = require('../../pages/register.page');
const homePage = require('../../pages/home.page');
const { createAccount } = require('../../support/utils');
const { user1 } = require('../../fixtures/user-data.json');

describe('Saque', () => {
    beforeEach(() => {
        loginPage.openPage();

    });

    it('Tentar abrir a página de Saque', () => {
        // criando conta 1
        createAccount(user1.email, user1.name, user1.password, true, 'account1');

        // login com a conta
        loginPage.login(user1.email, user1.password);
        homePage.clickWithdraw();
        
        // Verifica modal
        homePage.verifyWithdrawModal();

    });

});
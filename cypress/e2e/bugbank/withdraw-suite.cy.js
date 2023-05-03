const loginPage = require('../../pages/login.page');
const registerPage = require('../../pages/register.page');
const homePage = require('../../pages/home.page');
const { createAccount } = require('../../support/utils');

describe('Saque', () => {
    beforeEach(() => {
        loginPage.openPage();

    });
    it('Tentar abrir a página pagamentos', () => {
        // criando conta 1
        createAccount('star1@bem.com', 'Star', 'bem2023', true, 'account1');

        // login com a conta
        loginPage.login('star1@bem.com', 'bem2023');
        homePage.clickWithdraw();

        homePage.verifyWithdrawModal();

    });

});
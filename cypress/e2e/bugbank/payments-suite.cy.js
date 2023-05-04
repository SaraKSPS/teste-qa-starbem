const loginPage = require('../../pages/login.page');
const homePage = require('../../pages/home.page');
const registerPage = require('../../pages/register.page');
const { createAccount } = require('../../support/utils');
const { user1 } = require('../../fixtures/user-data.json');

describe('Tela de Pagamento', () => {
    beforeEach(() => {
        loginPage.openPage();
    });
    it('Tentar abrir a página de pagamentos', () => {
        // criando conta 1
        createAccount(user1.email, user1.name, user1.password, true, 'account1');

        // login com a conta
        loginPage.login(user1.email, user1.password);
        homePage.clickPayments();

        // verifica modal
        homePage.verifyPaymentsModal();

    });

});
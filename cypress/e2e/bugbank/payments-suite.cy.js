const loginPage = require('../../pages/login.page');
const homePage = require('../../pages/home.page');
const registerPage = require('../../pages/register.page');
const { createAccount } = require('../../support/utils');


describe('Tela de Pagamento', () => {
    beforeEach(() => {
        loginPage.openPage();
});

it('Tentar abrir a página de pagamentos', () => {
    // criando conta 1
    createAccount('star1@bem.com', 'Star', 'bem2023', true, 'account1');

    // login com a conta
    loginPage.login('star1@bem.com', 'bem2023');
    homePage.clickPayments();

    homePage.verifyPaymentsModal();

});

});
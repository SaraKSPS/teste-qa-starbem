const loginPage = require('../../pages/login.page');
const { createAccount } = require('../../support/utils');

describe('Login de usuário', () => {

    beforeEach(() => {
        loginPage.openPage();
    });

    it('Tentar fazer login sem e-mail', () => {
        loginPage.verifyLoginWithoutEmail('bem2023');

    });
    it('Tentar fazer login com senha incorreta', () => {
        createAccount('star1@bem.com', 'Star', 'bem2023', true, 'account1');
        loginPage.verifyLoginWrongPassword('star1@bem.com', '00');

    });
    it('Tentar fazer login sem senha', () => {
        createAccount('star1@bem.com', 'Star', 'bem2023', true, 'account1');
        loginPage.verifyLoginWithoutPassword('star1@bem.com');
    });

    it('Verificar funcionamento do botão de visualizar/esconder senha na tela de Login', () => {
        loginPage.fillLoginAndPassword('star1@bem.com', 'bem2023');
        // Clicar para mostrar a senha
        loginPage.clickViewOrHidePassword();
        loginPage.verifyPasswordField('text');
        // Clicar para esconder a senha
        loginPage.clickViewOrHidePassword();
        loginPage.verifyPasswordField('password');
    });
});
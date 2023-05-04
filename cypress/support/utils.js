const loginPage = require('../pages/login.page');
const registerPage = require('../pages/register.page');

/**
 * Cria conta a partir da tela inicial de login
 * @param {string} email - email para criação
 * @param {string} name - nome para criação
 * @param {string} password - senha/confirmação para criação de usuário
 * @param {boolean} shouldClickOnBalance - deve clicar ou não no botão de saldo
 * @param {string} accountName - variável do cypress que a conta será salva
 */
export function createAccount(email, name, password, shouldClickOnBalance, accountName) {
    loginPage.clickRegister();
    registerPage.registerInformation(email, name, password, password, shouldClickOnBalance);
    loginPage.verifyAndExtractAccount(accountName);
    loginPage.closePopup();
}
const loginPage = require('../pages/login.page');
const registerPage = require('../pages/register.page');

export function createAccount(email, name, password, shouldClickOnBalance, accountName) {
    loginPage.clickRegister();
    registerPage.registerInformation(email, name, password, password, shouldClickOnBalance);
    loginPage.verifyAndExtractAccount(accountName);
    loginPage.closePopup();
}
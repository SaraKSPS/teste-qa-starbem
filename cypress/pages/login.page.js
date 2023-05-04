
const elements = {
    btnRegister: '[class="style__ContainerButton-sc-1wsixal-0 ihdmxA button__child"]',
    btnAccess: '[class="style__ContainerButton-sc-1wsixal-0 otUnI button__child"]',
    textVerification: '[id=modalText]',
    btnClosePopup: '[id=btnCloseModal]',
    fieldEmail: '[name=email]',
    fieldPassword: '[name=password]',
    // Se verificar por "input__warging", é possível verificar que o erro acontece, mas não
    // de qual área o erro faz parte. Portanto:
    // usando o eq[0] para verificar o erro no email
    // usando o eq[1] para verificar o erro na senha
    textErrorMenssage: '[class=input__warging]',
    textModal: '[id=modalText]',
    btnViewPassword: '[class="login__eye"]',
};

class LoginPage {

    /**
     * Abre a página do bugbank
     */
    openPage() {
        cy.visit('https://bugbank.netlify.app/');
    };

    /**
     * Preenche os dados de login e senha
     * @param {string} email - Email usado para login
     * @param {string} password - Senha usada para login
     */
    fillLoginAndPassword(email, password) {
        // Utilizando { force: true } para ignorar o erro quando o elemento ainda não está visível
        cy.get(elements.fieldEmail).eq(0).type(email, { force: true });
        cy.get(elements.fieldPassword).eq(0).type(password, { force: true });
    };


    /**
     * Verificar se a página aberta é a de login
     */
    verifyLoginUrl() {
        cy.url()
            .should('be.equal', 'https://bugbank.netlify.app/')
    }

    /**
     * Realiza login no portal do bugbank
     * @param {string} email - Email usado para login
     * @param {string} password - Senha usada para login
     */
    login(email, password) {
        this.fillLoginAndPassword(email, password);
        cy.get(elements.btnAccess).click();
    };

    /**
     * Clicar no botão de registrar conta
     */
    clickRegister() {
        cy.get(elements.btnRegister, { timeout: 1000 }).should('exist').click();
    };

    /**
     * Verifica se a conta foi criada com sucesso e salva o número da conta usando a variável de entrada
     * @param {string} accountName - Nome da variável que será usada para salvar o número da conta criada
     */
    verifyAndExtractAccount(accountName) {
        cy.get(elements.textVerification).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = ' foi criada com sucesso';
                    expect(text).to.contains(expectedMessage);
                    let account = text.split(expectedMessage)[0].split('A conta ')[1];
                    cy.wrap(account).as(accountName)
                }
            );
    };

    /**
     * Fecha o pop-up na tela de login
     */
    closePopup() {
        cy.get(elements.btnClosePopup, { timeout: 1000 }).should('be.visible').click();
    };

    /**
     * Tenta realizar login sem email e verifica a mensagem de erro
     * @param {string} password - Senha usada para o teste
     */
    verifyLoginWithoutEmail(password) {
        cy.get(elements.fieldPassword).eq(0).type(password, { force: true });
        cy.get(elements.btnAccess).click();
        cy.get(elements.textErrorMenssage).eq(0).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'É campo obrigatório';
                    expect(text).to.contains(expectedMessage);
                }
            );
    };

    /**
     * Tenta logar com senha errada e verifica as mensagens de erro
     * @param {string} email - Email do usuário
     * @param {string} password - Uma senha inválida para o usuário
     */
    verifyLoginWrongPassword(email, password) {
        this.login(email, password);
        cy.get(elements.textModal).invoke('text')
            .then(
                function (text) {
                    const expectedInitialMesssage = 'Usuário ou senha inválido.';
                    const expectedFinalMessage = 'Tente novamente ou verifique suas informações!';
                    expect(text).to.contains(expectedInitialMesssage);
                    expect(text).to.contains(expectedFinalMessage);
                }
            );
    };

    /**
     * Tenta logar usando algum email sem a senha e verifica a mensagem de campo obrigatório
     * @param {string} email - Email usado para o teste
     */
    verifyLoginWithoutPassword(email) {
        cy.get(elements.fieldEmail).eq(0).type(email, { force: true });
        cy.get(elements.btnAccess).click();
        cy.get(elements.textErrorMenssage).eq(1).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'É campo obrigatório';
                    expect(text).to.contains(expectedMessage);
                });
    };

    /**
     * Clica no botão de mostrar ou esconder a senha 
     */
    clickViewOrHidePassword() {
        cy.get(elements.btnViewPassword, { timeout: 1000 }).eq(0).click({ force: true });
    };

    /**
     * Verifica se a senha é mostrada ou não baseado no parâmetro type
     * @param {string} type - Tipo esperado do campo password
     * Se type for text: É esperado que a senha está sendo mostrada
     * Se type for password: É esperado que a senha está escondida
     */
    verifyPasswordField(type) {
        cy.get(elements.fieldPassword).eq(0).should('have.attr', 'type', type);
    };

    /**
     * Verifica se a página de Login está sendo mostrada corretamente a partir do botão Acessar
     */
    verifyLoginPageDisplayed() {
        cy.get(elements.btnAccess).should('exist');
    }
};

export default new LoginPage();
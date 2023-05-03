const elements = {
    fieldEmail: '[name=email]',
    fieldName: '[name=name]',
    fieldPassword: '[name=password]',
    fieldConfirmationPassword: '[name=passwordConfirmation]',
    btnBalance: '[id=toggleAddBalance]',
    btnRegister: '[class="style__ContainerButton-sc-1wsixal-0 CMabB button__child"]',
    btnViewPassword: '[class="login__eye"]',
    // Se verificar por "input__warging", é possível verificar que o erro acontece, mas não
    // de qual área o erro faz parte. Portanto:
    // usando o eq[2] para verificar o erro no email
    // usando o eq[4] para verificar o erro na senha
    // usando o eq[5] para verificar o erro na confirmação de senha
    // eq[3] seria para o nome, mas não encontrei um cenário em que o erro aparece neste campo
    textErrorMessage: '[class=input__warging]',
    textModal: '[id=modalText]',
    btnBack: '[id=btnBackButton]',
};

class RegisterPage {

    /**
     * Limpa todos os campos de registro de usuário
     * Esta função é necessária porque as informações continuam preenchidas
     * após criar um usuário
     */
    clearInformations() {
        cy.get(elements.fieldEmail).eq(1).clear({ force: true });
        cy.get(elements.fieldName).clear({ force: true });
        cy.get(elements.fieldPassword).eq(1).clear({ force: true });
        cy.get(elements.fieldConfirmationPassword).clear({ force: true });
    };

    /**
     * Apenas preenche os dados do usuário
     * @param {string} email - Email do usuário
     * @param {string} name - Nome do usuário
     * @param {string} password - Senha do usuário
     * @param {string} passwordConfirmation - Confirmação de senha do usuário
     */
    fillRegisterData(email, name, password, passwordConfirmation) {
        cy.get(elements.fieldName).type(name, { force: true });
        cy.get(elements.fieldEmail).eq(1).type(email, { force: true });
        cy.get(elements.fieldPassword).eq(1).type(password, { force: true });
        cy.get(elements.fieldConfirmationPassword).type(passwordConfirmation, { force: true })
    }

    /**
     * Preenche as informações de registro e clica para confirmar
     * @param {string} email - Email para registrar usuário
     * @param {string} name - Nome do usuário
     * @param {string} password - Senha do usuário
     * @param {string} passwordConfirmation - Confirmação da senha
     * @param {boolean} shouldClickOnBalance - Clicar ou não no botão de adicionar saldo
     * Se shouldClickOnBalance for true - Clica no botão de adicionar saldo
     * Se shouldClickOnBalance for false - Não clica no botão de adicionar saldo
     */
    registerInformation(email, name, password, passwordConfirmation, shouldClickOnBalance) {
        // Limpar todos os campos
        this.clearInformations();

        // Digitar nos campos
        this.fillRegisterData(email, name, password, passwordConfirmation);

        // Clicar ou não no botão de adicionar saldo
        if (shouldClickOnBalance === true) {
            cy.get(elements.btnBalance).click({ force: true });
        }
        cy.get(elements.btnRegister, { timeout: 1000 }).click({ force: true });
    };

    /**
     * Tenta criar conta sem email e verifica a mensagem esperada de erro
     * @param {string} name - Nome do usuário
     * @param {string} password - Senha do usuário
     * @param {string} passwordConfirmation - Confirmação de senha do usuário
     */
    verifyErrorWithoutEmail(name, password, passwordConfirmation) {
        // Preenche todos os dados, exceto email
        cy.get(elements.fieldName).type(name, { force: true });
        cy.get(elements.fieldPassword).eq(1).type(password, { force: true });
        cy.get(elements.fieldConfirmationPassword).type(passwordConfirmation, { force: true });
        cy.get(elements.btnRegister, { timeout: 1000 }).click({ force: true });
        // Verifica mensagem de erro no terceiro errorMessage (email)
        cy.get(elements.textErrorMessage).eq(2).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'É campo obrigatório';
                    expect(text).to.contains(expectedMessage);
                });
    };

    /**
       * Tenta criar conta sem senha e verifica a mensagem esperada de erro
       * @param {string} name - Nome do usuário
       * @param {string} email - Email do usuário
       * @param {string} passwordConfirmation - Confirmação de senha do usuário
       */
    verifyErrorWithoutPassword(email, name, passwordConfirmation) {
        cy.get(elements.fieldEmail).eq(1).type(email, { force: true });
        cy.get(elements.fieldName).type(name, { force: true });
        cy.get(elements.fieldConfirmationPassword).type(passwordConfirmation, { force: true });
        cy.get(elements.btnRegister, { timeout: 1000 }).click({ force: true });
        // Verifica mensagem de erro no quinto errorMessage (password)
        cy.get(elements.textErrorMessage).eq(4).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'É campo obrigatório';
                    expect(text).to.contains(expectedMessage);
                });

    };

    /**
   * Tenta criar conta sem confirmação de senha e verifica a mensagem esperada de erro
   * @param {string} name - Nome do usuário
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   */
    verifyErrorWithoutConfirmationPassword(email, name, password) {
        cy.get(elements.fieldEmail).eq(1).type(email, { force: true });
        cy.get(elements.fieldName).type(name, { force: true });
        cy.get(elements.fieldPassword).eq(1).type(password, { force: true });
        cy.get(elements.btnRegister, { timeout: 1000 }).click({ force: true });
        // Verifica mensagem de erro no sexto errorMessage (confirmation password)
        cy.get(elements.textErrorMessage).eq(5).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'É campo obrigatório';
                    expect(text).to.contains(expectedMessage);
                });
    };

    /**
     * Tenta registrar uma conta usando diferentes senhas e valida a mensagem de erro no modal
     * @param {string} email - Email do usuário
     * @param {string} name - Nome do usuário
     * @param {string} password - Senha do usuário
     * @param {string} passwordConfirmation - Senha diferente de "password"
     */
    verifyErrorUsingDifferentPasswords(email, name, password, passwordConfirmation) {
        this.fillRegisterData(email, name, password, passwordConfirmation);
        cy.get(elements.btnRegister, { timeout: 1000 }).click({ force: true });
        cy.get(elements.textModal).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'As senhas não são iguais.';
                    expect(text).to.contains(expectedMessage);
                });
    };

    /**
     * Tenta usar email inválido e verifica a mensagem de erro
     * @param {string} email - Email do usuário
     * @param {string} name - Nome do usuário
     * @param {string} password - Senha do usuário
     * @param {string} passwordConfirmation - Confirmação de senha do usuário
     */
    verifyErrorUsingInvalidEmail(email, name, password, passwordConfirmation) {
        this.fillRegisterData(email, name, password, passwordConfirmation);
        cy.get(elements.btnRegister, { timeout: 1000 }).click({ force: true });
        // Verifica mensagem de erro no terceiro errorMessage (email)
        cy.get(elements.textErrorMessage).eq(2).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'Formato inválido';
                    expect(text).to.contains(expectedMessage);
                });
    };

    /**
     * Clicar para voltar para a tela de Login
     */
    clickBackButton() {
        cy.get(elements.btnBack, { timeout: 1000 }).click({ force: true });
    };

    /**
     * Tenta criar conta usando email já cadastrado e verifica erro
     * @param {string} email - Email do usuário
     * @param {string} name - Nome do usuário
     * @param {string} password - Senha do usuário
     * @param {string} passwordConfirmation - Confirmação de senha do usuário
     */
    verifyErrorUsingSameEmail(email, name, password, passwordConfirmation) {
        this.clearInformations();
        this.fillRegisterData(email, name, password, passwordConfirmation);
        cy.get(elements.btnRegister, { timeout: 1000 }).click({ force: true });
        cy.get(elements.textModal).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'Email já cadastrado.';
                    expect(text).to.contains(expectedMessage);
                });
    };



    /**
    * Clica no botão de mostrar ou esconder para senha e confirmação de senha
    */
    clickViewOrHidePasswordAndConfirmation() {
        cy.get(elements.btnViewPassword, { timeout: 1000 }).eq(1).click({ force: true });
        cy.get(elements.btnViewPassword, { timeout: 1000 }).eq(2).click({ force: true });

    };

    /**
     * Verifica se a senha e confirmação de senha são mostradas ou não baseado no parâmetro type
     * @param {string} type - Tipo esperado do campo password e confirmation password
     * Se type for text: É esperado que a senha e confirmação estão sendo mostradas
     * Se type for password: É esperado que a senha e confirmação estão escondidas
     */
    verifyPasswordAndConfirmationFields(type) {
        cy.get(elements.fieldPassword).eq(1).should('have.attr', 'type', type);
        cy.get(elements.fieldConfirmationPassword).should('have.attr', 'type', type);

    };

};
export default new RegisterPage();
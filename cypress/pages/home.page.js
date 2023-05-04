const elements = {
    textBalance: '[id=textBalance]',
    textName: '[id=textName]',
    textAccount: '[id=textAccountNumber]',
    btnTransfer: '[id=btn-TRANSFERÊNCIA]',
    btnExtract: '[id=btn-EXTRATO]',
    btnLogout: '[class="home__ContainerLink-sc-1auj767-2 cCGrzy"]',
    btnPayments: '[id=btn-PAGAMENTOS]',
    textModal: '[id=modalText]',
    btnCloseModal: '[id=btnCloseModal]',
    btnWithdraw: '[id=btn-SAQUE]',

};

class HomePage {

    /**
     * Abre a página de home
     */
    openPage() {
        cy.visit('https://bugbank.netlify.app/home');
    };


    /**
     * Verifica o saldo na tela inicial
     * @param {string} balance - saldo esperado para o usuário
     */
    verifyBalance(balance) {
        cy.get(elements.textBalance).invoke('text').should('contain', balance);
    }

    /**
     * Verifica informações do usuário
     * @param {string} balance - saldo esperado
     * @param {string} name - nome esperado
     * @param {string} account - número da conta esperada com dígito 
     */
    verifyAccountInformation(balance, name, account) {
        this.verifyBalance(balance);
        cy.get(elements.textName).invoke('text').should('contain', 'Olá ' + name + ',')
        cy.get(elements.textAccount).invoke('text').then(
            (text) => {
                const expectedAccount = 'Conta digital: ' + account;
                expect(text).to.equal(expectedAccount);
            });
    }

    /**
     * Clica no ícone de Extrato
     */
    clickToExtractPage() {
        cy.get(elements.btnExtract).click();
    };

    /**
     * Clica no ícone de Transferência
     */
    clickToTransferPage() {
        cy.get(elements.btnTransfer).click();
    };

    /**
     * Clica em logout
     */
    clickLogout() {
        cy.get(elements.btnLogout).click();
    };

    /**
     * Clica no ícone de Pagamentos
     */
    clickPayments() {
        cy.get(elements.btnPayments).click();
    };

    /**
     * Verifica a mensagem de funcionalidade em desenvolvimento
     */
    verifyFeatureInDevelopment() {
        cy.get(elements.textModal).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'Funcionalidade em desenvolvimento';
                    expect(text).to.contains(expectedMessage);
                    cy.get(elements.btnCloseModal).click();

                });
    };

    /**
     * Verifica o modal esperado quando clica em pagamentos
     */
    verifyPaymentsModal() {
        this.verifyFeatureInDevelopment();
    };

    /**
     * Clica no botão de Saques
     */
    clickWithdraw() {
        cy.get(elements.btnWithdraw).click();
    };

    /**
     * Verifica o modal esperado quando clica em Saques
     */
    verifyWithdrawModal() {
        this.verifyFeatureInDevelopment();
    };
}

export default new HomePage();
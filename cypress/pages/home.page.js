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

    verifyBalance(balance) {
        cy.get(elements.textBalance).invoke('text').should('contain', balance);
    }

    verifyAccountInformation(balance, name, account) {
        cy.get(elements.textBalance).invoke('text').should('contain', balance)
        cy.get(elements.textName).invoke('text').should('contain', 'Olá ' + name + ',')
        cy.get(elements.textAccount).invoke('text').then(
            (text) => {
                const expectedAccount = 'Conta digital: ' + account;
                expect(text).to.equal(expectedAccount);
            });
    }

    clickToExtractPage() {
        cy.get(elements.btnExtract).click();
    };

    clickToTransferPage() {
        cy.get(elements.btnTransfer).click();
    };
    clickLogout() {
        cy.get(elements.btnLogout).click();
    };
    clickPayments() {
        cy.get(elements.btnPayments).click();
    };
    verifyPaymentsModal() {
        cy.get(elements.textModal).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'Funcionalidade em desenvolvimento';
                    expect(text).to.contains(expectedMessage);
                    cy.get(elements.btnCloseModal).click();

                });
    };
    clickWithdraw() {
        cy.get(elements.btnWithdraw).click();

    };

    verifyWithdrawModal() {
        cy.get(elements.textModal).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'Funcionalidade em desenvolvimento';
                    expect(text).to.contains(expectedMessage);
                    cy.get(elements.btnCloseModal).click();

                });
    };
}

export default new HomePage();
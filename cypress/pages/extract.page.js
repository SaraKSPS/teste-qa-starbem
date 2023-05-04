
const elements = {
    textBalance: '[id=textBalanceAvailable]',
    textTypeTransaction: '[id=textTypeTransaction]',
    textDescription: '[id=textDescription]',
    textTransferValue: '[id=textTransferValue]',
    textTransferValueSent: '[id=textTypeTransaction]',
    textTransferValueReceived: '[id=textTransferValue]',
    btnBack: '[id=btnBack]',
    btnLogout: '[id=btnExit]',
};

class ExtractPage {

    /**
     * Abre a página de extrato
     */
    openPage() {
        cy.visit('https://bugbank.netlify.app/bank-statement');
    };


    /**
     * Verifica resultado da transação enviada
     * @param {string} balance - saldo esperado do usuário
     * @param {string} description - descrição esperada
     * @param {string} valueSent - valor enviado esperado
     */
    verifyTransactionSent(balance, description, valueSent) {
        cy.get(elements.textBalance).invoke('text').should('contain', balance);
        cy.get(elements.textTypeTransaction).invoke('text').should('contain', 'Transferência enviada');
        cy.get(elements.textDescription).invoke('text').should('contain', description);
        cy.get(elements.textTransferValue).invoke('text').should('contain', valueSent);
        // valor negativo
        cy.get(elements.textTransferValue).invoke('text').should('contain', '-');
        cy.get(elements.btnBack).click();

    };
    /**
     * Verifica resultado da transação recebida
     * @param {string} valueReceived - valor recebido esperado
     */
    verifyTransactionReceived(valueReceived) {
        cy.get(elements.textTransferValueSent).invoke('text').should('contain', 'Transferência recebida');
        cy.get(elements.textTransferValueReceived).eq(1).invoke('text').should('contain', valueReceived);
        cy.get(elements.btnBack).click();

    };

    /**
     * Verifica descrição vazia
     */
    verifyEmptyDescription() {
        cy.get(elements.textDescription).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = '-';
                    expect(text).to.contains(expectedMessage);

                });

    };

    /**
     * Clica em logout
     */
    clickLogout() {
        cy.get(elements.btnLogout).click();
    };

};

export default new ExtractPage();

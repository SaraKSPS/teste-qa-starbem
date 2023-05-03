
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

    verifyTransactionSent(balance, description, valueSent) {
        cy.get(elements.textBalance).invoke('text').should('contain', balance);
        cy.get(elements.textTypeTransaction).invoke('text').should('contain', 'Transferência enviada');
        cy.get(elements.textDescription).invoke('text').should('contain', description);
        cy.get(elements.textTransferValue).invoke('text').should('contain', valueSent);
        cy.get(elements.textTransferValue).invoke('text').should('contain', '-');
        cy.get(elements.btnBack).click();

    };
    verifyTransactionReceived(valueReceived) {
        cy.get(elements.textTransferValueSent).invoke('text').should('contain', 'Transferência recebida');
        cy.get(elements.textTransferValueReceived).eq(1).invoke('text').should('contain', valueReceived);
        cy.get(elements.btnBack).click();

    };
    verifyTransactionSentWithoutDescrition(balance, description, valueSent) {
        cy.get(elements.textBalance).invoke('text').should('contain', balance);
        cy.get(elements.textTypeTransaction).invoke('text').should('contain', 'Transferência enviada');
        cy.get(elements.textDescription).invoke('text').eq(1).should('contain', description);
        cy.get(elements.textTransferValue).invoke('text').should('contain', valueSent);
        cy.get(elements.textTransferValue).invoke('text').should('contain', '-');
        cy.get(elements.btnBack).click();


    };
    verifyEmptyDescription() {
        cy.get(elements.textDescription).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = '-';
                    expect(text).to.contains(expectedMessage);

                });

    };
    clickLogout() {
        cy.get(elements.btnLogout).click();
    };

};

export default new ExtractPage();

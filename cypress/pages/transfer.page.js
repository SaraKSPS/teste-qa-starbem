
const elements = {
    textAccountNumber: '[name=accountNumber]',
    textAccountDigit: '[name=digit]',
    textTransferValue: '[name=transferValue]',
    textDescription: '[name=description]',
    btnTransferNow: '[class="style__ContainerButton-sc-1wsixal-0 CMabB button__child"]',
    btnCloseModal: '[id=btnCloseModal]',
    textModal: '[id=modalText]',
    btnBack: '[id=btnBack]',
    textMessageError: '[class=input__warging]',

};

class TransferPage {

    transferToAnotherAccount(accountNumber, accountDigit, value, description) {
        cy.get(elements.textAccountNumber).type(accountNumber);
        cy.get(elements.textAccountDigit).type(accountDigit);
        cy.get(elements.textTransferValue).type(value);
        cy.get(elements.textDescription).type(description);
        cy.get(elements.btnTransferNow).click();
    };

    verifyTransferModal() {
        cy.get(elements.textModal).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'Transferencia realizada com sucesso';
                    expect(text).to.contains(expectedMessage);
                });
    };

    closeModal() {
        cy.get(elements.btnCloseModal).click();
    };

    backToHomePage() {
        cy.get(elements.btnBack).click();
    };

    verifyHigherBalanceModal() {
        cy.get(elements.textModal).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'Você não tem saldo suficiente para essa transação';
                    expect(text).to.contains(expectedMessage);

                });

    };
    verifyInvalidAccountModal() {
        cy.get(elements.textModal).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'Conta inválida ou inexistente';
                    expect(text).to.contains(expectedMessage);

                });

    };
    
    transferJustTheValue(value) {
        cy.get(elements.textTransferValue).type(value);
        cy.get(elements.btnTransferNow).click();
    };

    verifyTransferSameAccountModal() {
        cy.get(elements.textModal).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'Nao pode transferir pra mesmo conta';
                    expect(text).to.contains(expectedMessage);

                });
    };
    verifyTransferNegativeModal() {
        cy.get(elements.textModal).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'Valor da transferência não pode ser 0 ou negativo';
                    expect(text).to.contains(expectedMessage);

                });
    };

    verifyMessageOnlyNumbersAllowedError() {
        cy.get(elements.textMessageError).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'Somente números são permitidos';
                    expect(text).to.contains(expectedMessage);

                });
    };

    transferToAnotherAccountWithoutDescription(accountNumber, accountDigit, value) {
        cy.get(elements.textAccountNumber).type(accountNumber);
        cy.get(elements.textAccountDigit).type(accountDigit);
        cy.get(elements.textTransferValue).type(value);
        cy.get(elements.btnTransferNow).click();
    };
    
};

export default new TransferPage();


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

    /**
     * Abre a página de transferência
     */
    openPage() {
        cy.visit('https://bugbank.netlify.app/transfer');
    };

    /**
     * Digita o valor e informações para fazer transferência
     * @param {string} accountNumber - Número da conta do destino
     * @param {string} accountDigit - Número do dígito da conta do destino
     * @param {string} value - Valor a ser transferido
     * @param {string} description - Descrição da transferência
     */
    transferToAnotherAccount(accountNumber, accountDigit, value, description) {
        cy.get(elements.textAccountNumber).type(accountNumber);
        cy.get(elements.textAccountDigit).type(accountDigit);
        cy.get(elements.textTransferValue).type(value);
        cy.get(elements.textDescription).type(description);
        cy.get(elements.btnTransferNow).click();
    };

    /**
     * Verifica se a mensagem de transferência com sucesso aparece no modal
     */
    verifyTransferModal() {
        cy.get(elements.textModal).invoke('text')
            .then(
                function (text) {
                    // O certo seria: 'Transferência' realizada com sucesso
                    const expectedMessage = 'Transferencia realizada com sucesso';
                    expect(text).to.contains(expectedMessage);
                });
    };

    /**
     * Fecha o modal
     */
    closeModal() {
        cy.get(elements.btnCloseModal).click();
    };

    /**
     * Retorna para a Home Page
     */
    backToHomePage() {
        cy.get(elements.btnBack).click();
    };

    /**
     * Verifica se aparece mensagem de erro sobre saldo insuficiente no modal
     */
    verifyHigherBalanceModal() {
        cy.get(elements.textModal).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'Você não tem saldo suficiente para essa transação';
                    expect(text).to.contains(expectedMessage);

                });

    };

    /**
     * Verifica se a mensagem de conta inválida aparece na tela
     */
    verifyInvalidAccountModal() {
        cy.get(elements.textModal).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'Conta inválida ou inexistente';
                    expect(text).to.contains(expectedMessage);

                });

    };

    /**
     * Tenta transferir apenas o valor, sem passar outros valores
     * @param {string} value - valor da transação
     */
    transferJustTheValue(value) {
        cy.get(elements.textTransferValue).type(value);
        cy.get(elements.btnTransferNow).click();
    };

    /**
     * Verificar se a mensagem de erro de transferência para a mesma conta aparece
     */
    verifyTransferSameAccountModal() {
        cy.get(elements.textModal).invoke('text')
            .then(
                function (text) {
                    // O certo seria: 'Não' pode transferir pra 'mesma' conta
                    const expectedMessage = 'Nao pode transferir pra mesmo conta';
                    expect(text).to.contains(expectedMessage);

                });
    };

    /**
     * Verifica se a mensagem de erro para transferir valor negativo ou 0 aparece
     */
    verifyTransferNegativeModal() {
        cy.get(elements.textModal).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'Valor da transferência não pode ser 0 ou negativo';
                    expect(text).to.contains(expectedMessage);

                });
    };

    /**
     * Verifica se mensagem de "somente números são permitidos" aparece
     */
    verifyMessageOnlyNumbersAllowedError() {
        cy.get(elements.textMessageError).invoke('text')
            .then(
                function (text) {
                    const expectedMessage = 'Somente números são permitidos';
                    expect(text).to.contains(expectedMessage);

                });
    };

    /**
     * Transfere para outra conta sem adicionar descrição
     * Foi necessário criar esta função porque o cypress não aceita preencher com texto vazio
     * @param {string} accountNumber - Conta do usuário de destino
     * @param {string} accountDigit - Dígito da conta do usuário de destino
     * @param {string} value - Valor a ser transferido
     */
    transferToAnotherAccountWithoutDescription(accountNumber, accountDigit, value) {
        cy.get(elements.textAccountNumber).type(accountNumber);
        cy.get(elements.textAccountDigit).type(accountDigit);
        cy.get(elements.textTransferValue).type(value);
        cy.get(elements.btnTransferNow).click();
    };

};

export default new TransferPage();

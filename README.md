# teste-qa-starbem

- [teste-qa-starbem](#teste-qa-starbem)
  - [Sobre](#sobre)
  - [Primeiro Teste](#primeiro-teste)
    - [Casos de Testes](#casos-de-testes)
    - [Observações](#observações)
  - [Segundo Teste](#segundo-teste)
    - [Cenários de Teste](#cenários-de-teste)
        - [Transferência entre Contas](#transferência-entre-contas)
        - [Login](#login)
        - [Pagamentos](#pagamentos)
        - [Registro de Contas](#registro-de-contas)
    - [Instalação e uso](#instalação-e-uso)
    - [Executar Testes e Relatório](#executar-testes-e-relatório)
    - [Executar testes pela tela do Cypress](#executar-testes-pela-tela-do-cypress)
    - [Status dos Testes](#status-dos-testes)
    - [Bugs](#bugs)
    - [CI - Github Action](#ci---github-action)



## Sobre
Este repositório contém a resolução dos desafios de QA da StarBem, conforme registrado no repositório [qa-technical-test](https://github.com/StarBem/qa-technical-test/).
Os desafios consistem em:
- Apresentar um roteiro de testes baseado no fluxo de agendamento de consultas do aplicativo Starbem;
- Criar um projeto de testes automatizando um sistema Web chamado [BugBank](https://bugbank.netlify.app/)

## Primeiro Teste

### Casos de Testes
Foram criados casos de testes para o fluxo de agendamento de consultas. Os casos de testes podem ser consultados no link abaixo:

[Casos de Testes para o Fluxo de Agendamento de Consultas](https://docs.google.com/spreadsheets/d/1tbjqQVsarn7G17MIcaKbVjGuUGA01K3c8vNlN9orxYQ)


### Observações
- Não foram feitos testes para o cenário de enviar anexos porque o fluxo de envio de anexos (ou exames) não está adicionado na pasta [flow](https://github.com/StarBem/qa-technical-test/blob/main/flow/);
- Não foram feitos testes para o cenário de "Alterar número", conforme a tela de "Confirmação de Agendamento", porque não existem telas adicionadas sobre o fluxo de trocar o número de WhatsApp;
- Está sendo assumido que a tela de Tutorial sempre aparecerá após o usuário clicar em "Agendar Consulta" na tela inicial;
- Poderiam ser adicionados casos de testes sobre o limite do tamanho do texto de descrição na tela de "Motivo da Consulta" se tivesse alguma informação sobre o tamanho máximo do texto no campo;
- Poderiam ser adicionados casos de testes para verificar se todos os textos e botões nos fluxos estão conforme a especificação de Produto;
- Está sendo assumido que aparecerá uma mensagem de erro informando o usuário que não é possível adicionar uma terceira consulta no mês ou uma segunda consulta na semana;
- Está sendo assumido que a tela inicial com o botão "Agendar Consulta" aparecerá ao clicar em "Cancelar" em qualquer tela.

## Segundo Teste

### Cenários de Teste
Foram adicionados 28 testes automatizados divididos entre as seguintes suítes:

##### Transferência entre Contas
- Criar contas, transferir com descrição e verificar valores no saldo e extrato de ambas as contas
- Tentar transferir valor maior que o saldo
- Tentar transferir para uma conta inexistente
- Tentar transferir sem informar uma conta
- Tentar transferir para a mesma conta
- Tentar transferir para outra conta com valor negativo
- Tentar transferir para outra conta com valor zero
- Verificar mensagem de erro ao tentar inserir texto no lugar do valor
- Realizar transferência sem descrição
- Tentar abrir a página de Saque
##### Login
- Tentar fazer login sem e-mail
- Tentar fazer login com senha incorreta
- Tentar fazer login sem senha
- Verificar funcionamento do botão de visualizar/esconder senha na tela de Login
- Verificar se usuário foi redirecionado ao tentar abrir a home sem efetuar login
- Verificar se usuário foi redirecionado ao tentar abrir o extrato sem efetuar login
- Verificar se usuário foi redirecionado ao tentar abrir a página de transferência sem efetuar login
##### Pagamentos
- Tentar abrir a página de pagamentos
##### Registro de Contas
- Criar conta com saldo e verificar saldo, nome e número da conta
- Criar conta sem saldo e verificar saldo, nome e número da conta
- Verificar mensagem de erro ao tentar criar uma conta sem email
- Verificar mensagem de erro ao criar uma conta sem senha
- Verificar mensagem de erro ao criar uma conta sem a confirmação de senha
- Tentar criar conta com senhas diferentes e verificar mensagem de erro
- Tentar criar conta com email inválido e verificar mensagem de erro
- Clicar no botão voltar da página "Registrar" e verificar que a página Login é mostrada
- Verificar erro esperado na criação de contas com o mesmo email
- Verificar botão de visualizar senha ao criar conta

### Instalação e uso
1. Certifique-se que o Node esteja instalado na sua máquina. Caso não esteja, siga os passos de instalação conforme seu sistema operacional. [Ir para a página de instalação do NodeJS](https://nodejs.org/en/download).
2. Clone este repositório.
3. Usando o terminal do sistema ou do VSCode, rode `npm ci` na pasta raíz do projeto para instalar os módulos localmente.

### Executar Testes e Relatório

Execute `npm test` para que os testes sejam executados sem precisar abrir a tela do navegador.

Desta forma, os vídeos e capturas de telas (nos casos de erros) estarão disponíveis em, respectivamente, `./cypress/videos` e `./cypress/screenshots`. 

O resumo do resultado será exibido na linha de comando e o relatório do teste será visualizado ao abrir o arquivo `index.html` dentro de `./cypress/reports`. Todos os testes que falham possuem screenshots e vídeos no relatório


### Executar testes pela tela do Cypress
Para executar utilizando a tela do Cypress, siga os passos a seguir:

1. Execute `npm run open-ui`.
2. Selecione alguma suite de teste.
3. Aguarde a execução dos testes.
4. Selecione alguma outra suite de teste, caso queira verificar a execução da mesma.


### Status dos Testes


3 dos 28 testes estão falhando, o que resulta em uma taxa de sucesso de 89.3%. Os testes que falham são:
- **Verificar erro esperado na criação de contas com o mesmo email**: Não deveria ser possível criar duas contas com o mesmo email;
- **Tentar transferir sem informar uma conta**: Não deveria ser possível transferir sem informar a conta
- **Verificar mensagem de erro ao tentar inserir texto no lugar do valor**: Aparece uma mensagem de erro de programação, e não uma mensagem amigável para o usuário

> Optei por não falhar testes com erros de gramática. No entando, os problemas serão listados nos Bugs.


### Bugs

Também criei um relatório com os bugs encontrados, evidências e passo a passo para reproduzir:

[Lista de Bugs](https://docs.google.com/spreadsheets/d/1ozM4xwn_1Wx6JRQu6H-FmG5gHbLg3qhMh_TCr0LvJVw/edit?usp=sharing)



### CI - Github Action

Foi adicionada uma rotina para realizar os testes diariamente ou após cada commit.

É possível conferir esta rotina no [Github Actions](https://github.com/SaraKSPS/teste-qa-starbem/actions/)

> Como 3 dos 28 testes estão falhando, é esperado que a rotina esteja com o resultado de falha.
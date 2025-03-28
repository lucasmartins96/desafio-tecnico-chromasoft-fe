# Desafio Técnico - Aplicativo de Gerenciamento de Tarefas (Front-End)

## Introdução

Este repositório contém a minha solução para o desafio técnico de desenvolvimento Full Stack. O objetivo foi construir um aplicativo de gerenciamento de tarefas utilizando as tecnologias especificadas.

## Tecnologias Utilizadas

### Frontend:

- React (com Vite)
- Tailwind CSS
- React Router

## Funcionalidades Implementadas

### Autenticação

- Cadastro de usuários
- Signin, Login e logout

### Gerenciamento de Tarefas

- Criar, editar e excluir tarefas
- Listar todas as tarefas do usuário
- Marcar tarefas como concluídas
- Categorizar tarefas em colunas (pendentes/concluídas)

## Como Executar o Projeto

### Executando SEM Docker

1. Clone o repositório e entre na pasta do backend:
   ```sh
   git clone https://github.com/lucasmartins96/desafio-tecnico-chromasoft-fe.git
   cd desafio-tecnico-chromasoft-fe
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Configure as variáveis de ambiente (.env):
   ```
   VITE_API_URL=http://localhost:3000
   ```
4. Inicie a aplicação:
   ```sh
   npm run dev
   ```

### Executando COM Docker

1. Certifique-se de que o Docker e o Docker Compose estão instalados em sua máquina.
2. Clone o repositório e entre na pasta do projeto:
   ```sh
   git clone https://github.com/lucasmartins96/desafio-tecnico-chromasoft-fe.git
   cd desafio-tecnico-chromasoft-fe
   ```
3. Configure as variáveis de ambiente no arquivo `.env`.
   ```
     VITE_API_URL=http://localhost:3000
   ```
4. Execute o comando para subir os containers:
   ```sh
   docker-compose up --build
   ```
5. O frontend em `http://localhost:5173`.
6. Para parar os containers, utilize:
   ```sh
   docker-compose down
   ```

## Melhorias Futuras

- Implementação de testes automatizados.
- Melhorias na acessibilidade da interface.
- Implementação de Design Responsivo

## Conclusão

Este projeto foi desenvolvido como parte do desafio técnico para avaliar minhas habilidades em desenvolvimento Full Stack. Caso tenha alguma dúvida ou sugestão, fico à disposição!

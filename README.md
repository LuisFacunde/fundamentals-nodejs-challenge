# Fundamentals Node.js Challenge

Este projeto é uma API RESTful simples para gerenciamento de tarefas (To-Do), desenvolvida em Node.js puro, sem frameworks externos como Express.

## Descrição

A aplicação permite criar, listar, atualizar, remover e marcar tarefas como concluídas. O objetivo é exercitar conceitos fundamentais do Node.js, como manipulação de rotas, middlewares, leitura de corpo de requisições e organização de código.

## Funcionalidades

- **Criar tarefa:** `POST /tasks`
- **Listar tarefas:** `GET /tasks`
- **Atualizar tarefa:** `PUT /tasks/:id`
- **Remover tarefa:** `DELETE /tasks/:id`
- **Marcar/desmarcar tarefa como concluída:** `PATCH /tasks/:id/complete`
- Busca por título ou descrição nas tarefas (query param `search` em `/tasks`)

## Requisitos

- Node.js v20 ou superior
- npm (opcional, apenas para instalar dependências se necessário)

## Instruções para rodar o projeto

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/LuisFacunde/fundamentals-nodejs-challenge.git
   cd fundamentals-nodejs-challenge
   ```

2. **Instale as dependências (se houver):**
   ```sh
   npm install
   ```

3. **Execute o servidor:**
   ```sh
   npm run dev
   ```

   O servidor irá rodar na porta `3333`.

## Como utilizar

Você pode utilizar ferramentas como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/) para testar as rotas da API.

### Exemplos de requisições

- **Criar tarefa**
  - Método: `POST`
  - URL: `http://localhost:3333/tasks`
  - Body (JSON):
    ```json
    {
      "title": "Estudar Node.js",
      "description": "Praticar fundamentos de Node.js puro"
    }
    ```

- **Listar tarefas**
  - Método: `GET`
  - URL: `http://localhost:3333/tasks`

- **Atualizar tarefa**
  - Método: `PUT`
  - URL: `http://localhost:3333/tasks/{id}`
  - Body (JSON):
    ```json
    {
      "title": "Novo título",
      "description": "Nova descrição"
    }
    ```

- **Remover tarefa**
  - Método: `DELETE`
  - URL: `http://localhost:3333/tasks/{id}`

- **Marcar/desmarcar tarefa como concluída**
  - Método: `PATCH`
  - URL: `http://localhost:3333/tasks/{id}/complete`

## 📢 Créditos

Projeto desenvolvido como parte dos estudos de Node.js, inspirado em desafios de fundamentos para back-end na Rocketseat

## 👤 Autor

Desenvolvido por **Luis Facunde**
[LinkedIn](https://www.linkedin.com/in/luis-facunde/) | [GitHub](https://github.com/LuisFacunde)

## 📄 Licença

Sinta-se à vontade para usar, modificar e contribuir!

---

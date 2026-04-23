# 🛒 Pichau Clone - Node.js Backend

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" />
</div>

<br>

Um projeto Fullstack, integrando um frontend construído em **React** e um backend altamente estruturado e modularizado, desenvolvido com Node.js e Express, criado para simular o comportamento de um e-commerce gigante de tecnologia e hardware, inspirado na Pichau.

---

## 📝 Contexto

Esse projeto foi concebido e criado no intuito de desenvolver o backend de um e-commerce semelhante à Pichau. O objetivo principal é proporcionar um aprofundamento prático na criação de **APIs robustas e profissionais**, focando intensamente em aprimorar os conhecimentos nas tecnologias **Express** e **Prisma ORM**. A ideia é aplicar na prática conceitos utilizados no desenvolvimento real do mercado.

## 🎯 Objetivo

- Desenvolver um sistema de **Autenticação e Autorização** seguro utilizando **Cookies HTTP-Only** e JWT.
- Implementar **relacionamentos eficientes** no banco de dados através do ORM Prisma para gerenciar Usuários e Produtos.
- Garantir a integridade dos dados por meio de **validações de entradas** rigorosas com Zod.
- Aplicar princípios de **SOLID** arquiteturando o software com responsabilidades bem separadas em Controladores, Módulos e Shared Folders.
- Utilizar **Winston** para monitoramento e controle robusto de logs da aplicação.

---

## 💻 Stack e Bibliotecas

As tecnologias e ferramentas escolhidas para este projeto compõem uma stack moderna e escalável:

*   **React:** Biblioteca JavaScript (Frontend) para construção e dinamismo da interface web.
*   **Node.js & Express:** Motores do servidor backend, escaláveis e rápidos.
*   **TypeScript:** Garantia de tipagem estática e prevenção de erros em tempo de compilação.
*   **Prisma ORM:** Abstração e gerenciamento do banco de dados relacional.
*   **Zod:** Validação e parsing de esquemas de dados de entrada da API.
*   **Bcrypt & JSON Web Token (JWT):** Hashes de senhas, criação e validação de tokens seguros para autenticação.
*   **cookie-parser:** Módulo dedicado para leitura e gerenciamento eficiente dos tokens JWT armazenados em Cookies HTTP-Only.
*   **Winston:** Ferramenta avançada para estruturação de logs.
*   **SQLite:** Banco de dados relacional utilizado para agilidade durante o ecossistema de desenvolvimento.
*   **Swagger:** Estrutura para documentação e listagem interativa da API.

---

## 🔀 Endpoints

Abaixo estão listadas todas as rotas de acesso da API. Elas são divididas entre rotas de acesso livre (Públicas) e as que exigem o Token JWT válido (Protegidas). Note que agora a autenticação é gerida primariamente via **Cookies**.

### 🔓 Rotas Públicas
Rotas que não necessitam de autenticação.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/login` | Autentica no sistema e retorna o Token JWT (armazenado em Cookie). |
| `POST` | `/users` | Cria uma nova conta de usuário para o e-commerce. |
| `GET`  | `/products` | Lista todos os produtos disponíveis no catálogo. |

### 🔒 Rotas Protegidas
Rotas que precisam que o usuário esteja autenticado (Token JWT via Cookie) e, na maioria dos casos, possua privilégios administrativos.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/me` | Retorna as informações do usuário logado atualmente. |
| `GET` | `/users` | Lista todos os usuários cadastrados. *(Requer Admin)* |
| `PUT` | `/users/:id` | Atualiza os dados de um usuário pelo seu ID. *(Requer Admin)* |
| `DELETE` | `/users/:id` | Deleta a conta de um usuário do sistema. *(Requer Admin)* |
| `POST` | `/products` | Criação de um novo produto no catálogo de hardwares. *(Requer Admin)* |
| `PUT` | `/products/:id` | Atualiza os dados de um produto via ID. *(Requer Admin)* |
| `DELETE`| `/products/:id` | Remove um produto do catálogo de acordo com o ID. *(Requer Admin)* |

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para testar este projeto em sua própria máquina:

**1. Clone o repositório:**
```bash
git clone https://github.com/juniorAntunes910/Pichau2-node.js.git
cd Pichau2-node.js
```

**2. Instale as dependências exigidas:**
```bash
npm install
```

**3. Configure as Variáveis de Ambiente:**
Renomeie ou crie um arquivo `.env` na raiz do projeto contendo as credenciais de banco de dados (`DATABASE_URL`) e sua respectiva chave JWT.

**4. Crie o Banco de Dados (Prisma Migration):**
```bash
npx prisma migrate dev
```

**5. Inicie o Servidor Backend:**
Rode o comando exato abaixo para iniciar o ambiente utilizando Ts-Node via Dev:
```bash
npx ts-node-dev src/server.ts
```

> O servidor backend estará rodando na porta definida! Acesse seu client REST preferido (Insomnia, Postman) para interagir com as requisições. Como a aplicação utiliza cookies, certifique-se de habilitar e manter os cookies persistentes nas requisições subsequentes após o login.

**6. Inicie o Frontend (React):**
Com o servidor backend funcionando, abra um **novo terminal** na raiz do projeto e siga os passos abaixo para entrar no diretório do React, instalar (caso ainda não conste) os pacotes e rodar a interface:
```bash
cd Nexus-Front
npm run dev
```

---

## 📬 Contatos e Redes

Sinta-se à vontade para enviar um feedback sobre o projeto, conectar-se comigo ou discutir oportunidades!

- <img width="18px" src="https://simpleicons.org/icons/linkedin.svg" /> **LinkedIn:** [Junior Antunes - Perfil Profissional](https://www.linkedin.com/in/junior-antunes-625123296/)
- <img width="18px" src="https://simpleicons.org/icons/github.svg" /> **GitHub:** [@juniorAntunes910](https://github.com/juniorAntunes910)
- <img width="18px" src="https://simpleicons.org/icons/gmail.svg" /> **Email:** [jugabriel2612@gmail.com](mailto:jugabriel2612@gmail.com)

<br>
<p align="center">
  <i>Desenvolvido com dedicação por Junior Antunes.</i>
</p>

# 🛒 Pichau Clone - Node.js Backend

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" />
</div>

<br>

Um backend altamente estruturado e modularizado, desenvolvido com Node.js e Express, criado para simular o comportamento de um e-commerce gigante de tecnologia e hardware, inspirado na Pichau.

---

## 📝 Contexto

Esse projeto foi concebido e criado no intuito de desenvolver o backend de um e-commerce semelhante à Pichau. O objetivo principal é proporcionar um aprofundamento prático na criação de **APIs robustas e semi-profissionais**, focando intensamente em aprimorar os conhecimentos nas tecnologias **Express** e **Prisma ORM**. A ideia é aplicar na prática conceitos utilizados no desenvolvimento real do mercado.

## 🎯 Objetivo

- Desenvolver um sistema estruturado de **Autenticação e Autorização** de clientes e administradores (restringindo acessos via tokens e permissões).
- Implementar **relacionamentos eficientes** no banco de dados através do ORM Prisma para gerenciar Usuários e Produtos.
- Garantir a integridade dos dados por meio de **validações de entradas** rigorosas.
- Aplicar princípios de **SOLID** arquiteturando o software com responsabilidades bem separadas em Controladores, Módulos e Shared Folders.

---

## 💻 Stack e Bibliotecas

As tecnologias e ferramentas escolhidas para este projeto compõem uma stack moderna e escalável:

*   **Node.js & Express:** Motores do servidor backend, escaláveis e rápidos.
*   **TypeScript:** Garantia de tipagem estática e prevenção de erros em tempo de compilação.
*   **Prisma ORM:** Abstração e gerenciamento do banco de dados relacional.
*   **Zod:** Validação e parsing de esquemas de dados de entrada da API.
*   **Bcrypt & JSON Web Token (JWT):** Hashes de senhas, criação e validação de tokens seguros para autenticação.
*   **SQLite:** Banco de dados relacional utilizado para agilidade durante o ecossistema de desenvolvimento.
*   **Swagger:** Estrutura pronta para a documentação e listagem interativa da API.

---

## 🔀 Endpoints

Abaixo estão listadas todas as rotas de acesso da nossa API. Elas são divididas entre as de acesso livre (Públicas) e as que exigem o Token JWT de login ou de Administrador (Protegidas).

### 🔓 Rotas Públicas
Rotas que não necessitam de token de acesso.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/login` | Autentica no sistema e retorna o Token JWT. |
| `POST` | `/users` | Cria uma nova conta de usuário para o e-commerce. |

### 🔒 Rotas Protegidas
Rotas que precisam que o Token seja passado nos _Headers_ (Bearer Token) e, em muitos casos, que a conta possua privilégios administrativos.

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `GET` | `/users` | Lista todos os usuários cadastrados. |
| `PUT` | `/users/:id` | Atualiza os dados de um usuário pelo seu ID. |
| `DELETE` | `/users/:id` | Deleta a conta de um usuário do sistema. |
| `GET` | `/products` | Lista os produtos existentes. |
| `PUT` | `/products/:id` | Atualiza os dados de um produto via ID. |
| `POST` | `/products` | Lista a criação de um novo produto do catálogo de hardwares. |
| `DELETE`| `/products/:id` | Remove um produto do catálogo de acordo com o ID. |

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para testar este projeto em sua própria máquina:

**1. Clone o repositório:**
```bash
git clone https://github.com/juniorAntunes910/NexusStore-Node.js-Project-API
cd Nexusstore-Node.js-Project-API
```

**2. Instale as dependências exigidas:**
```bash
npm install
```

**3. Configure as Variáveis de Ambiente:**
Renomeie ou crie um arquivo `.env` na raiz do projeto contendo as credenciais de banco de dados (`DATABASE_URL`) e segredos do Token.

**4. Crie o Banco de Dados (Prisma Migration):**
```bash
npx prisma migrate dev
```

**5. Inicie o Servidor Backend:**
Rode o comando exato abaixo para iniciar o ambiente utilizando Ts-Node via Dev:
```bash
npx ts-node-dev src/server.ts
```

> A aplicação estará rodando na porta definida! Acesse seu client REST preferido (Insomnia, Postman) para interagir com as resquisições.

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

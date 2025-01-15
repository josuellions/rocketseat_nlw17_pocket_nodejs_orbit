### CURSO - Rocketseat - NLW 17 - Pocket

#### Data: 09/09/2024 a 12/09/2024

##### Educator: Diego Fernandes

##### Developer: Josuel A. Lopes

#### About

Desenvolvimento acadêmico de uma aplicação back-end em Node.js, conceitos de API REST, gerenciamento metas pessoais diária de atividades e bem-estar com interação, com registro de metas e progresso semanal.

- autenticação JWT
- workflow de CI/CD
- teste automatizado
- documentação swagger
- level por tarefas concluídas
- progresso por tarefas concluídas
- navegação de tarefas por semana
- gamificação por quantidade tarefas concluídas

Utilizando as tecnologias:

- Nodejs
- TypeScript,
- Fastify,
- Biome,
- ZOD
- Dayjs
- CORS
- Fastify/JWT
- Fastify/Swagger
- Parallel Drive / CUID2
- DrizzleORM + PostgreSQL,
- Docker e Zod para validação de dados.

<br/>

#### Projeto: in.orbit - Rocketseat NLW17 Pocket Nodejs

![iorbit_server_01](https://github.com/user-attachments/assets/39a41fa5-a154-4ba6-bd73-af398ea81672)

</br>

#### 📋 Sumário

---

- [📋 Sumário](#-sumário)
- [📂 Arquitetura e diretórios](#-arquitetura-e-diretórios)
- [📦 Pacotes](#-pacotes)
- [🧰 Dependências](#-dependências)
- [♻️ Variáveis de Ambiente](#-variáveis-de-ambiente)
- [🔥 Como executar](#-como-executar)
- [📑 Padronização](#-padronização)
- [📔 Documentação](#-documentação)
- [🧪 Testes](#-testes)
- [⚙️ CI/CD](#-CI/CD)
- [🚀 Build](#-build)
- [🔖 Version](#-version)
- [📜 Licença](#-licença)

<br/>

#### 📂 Arquitetura e diretórios

---

- MVC (Model View Controller)

```txt
  📦 root
  ┣ 📂 server
  ┃ ┣ 📂 _request
  ┃ ┃ ┗ 📜 api.http
  ┃ ┣ 📂 .vscode
  ┃ ┃ ┗ 📜 settings.json
  ┃ ┣ 📂 src
  ┃ ┃ ┣ 📂 db
  ┃ ┃ ┃ ┣ 📂 migrations
  ┃ ┃ ┃ ┣ 📜 index.js
  ┃ ┃ ┃ ┣ 📜 schema.js
  ┃ ┃ ┃ ┗ 📜 seed.js
  ┃ ┃ ┣ 📂 functions
  ┃ ┃ ┃ ┣ 📜 create-goal-completion.js
  ┃ ┃ ┃ ┣ 📜 create-goal.js
  ┃ ┃ ┃ ┣ 📜 get-week-pending-goals.ts
  ┃ ┃ ┃ ┗ 📜 get-week-summary.js
  ┃ ┃ ┣ 📂 http
  ┃ ┃ ┃ ┗ 📜 server.ts
  ┃ ┃ ┣ 📂 routes
  ┃ ┃ ┃ ┣ 📜 create-goal-completion.js
  ┃ ┃ ┃ ┣ 📜 create-goal.js
  ┃ ┃ ┃ ┣ 📜 get-week-pending-goals.ts
  ┃ ┃ ┃ ┗ 📜 get-week-summary.js
  ┃ ┃ ┗ 📜 env.ts
  ┃ ┣ 📂 tests
  ┃ ┣ 📜 .env
  ┃ ┣ 📜 .gitignore
  ┃ ┣ 📜 biome.json
  ┃ ┣ 📜 docker-compose.yml
  ┃ ┣ 📜 drizzle.config.ts
  ┃ ┣ 📜 package-lock.json
  ┃ ┣ 📜 package.json
  ┃ ┗ 📜 tsconfig.json
  ┗ 📜 README.md

```

<br/>

#### 📦 Pacotes

---

<br/>

#### 🧰 Dependências

---

- Docker
- - Docker Compose
- - - Criar e inicializar

```bash
docker compose --file docker-compose.yaml -d up
docker ps
```

ou

```bash
npm run services:up
```

- - - Para ou excluir

```bash
docker compose --file  docker-compose.yaml down
docker ps -a
```

ou

```bash
npm run services:down
```

- Banco Dados

- - Postgres (DBMS - Banco Dados relacional)

- - - DrizzleORM (Migrations)

- - - drizzle-orm (Query/Consultas)

```bash
npm run services:db:migrate
```

ou

- - - Para popular tabelas com dados iniciais

```bash
npm run services:db:seed
```

<br/>

#### ♻️ Variáveis de Ambiente

---

- Certifique-se de ter configurado o arquivo `.env` ou `.env.development` na raiz do projeto baseado no arquivo `.env.example`, com as variáveis de ambiente necessárias para execução do projeto.

- Caso você não tenha acesso aos valores, solicite ao responsável pelo projeto.

<br/>

#### 🔥 Como executar

---

- Realize o clone ou baixe o projeto localmente.

- - Instalar ou atualizar os pacotes e dependências

```bash
npm install
```

- - Para executar o projeto em modo de desenvolvimento.

```bash
npm run dev
```

- - Para executar o projeto em modo de produção e homologação.

```bash
npm run start
```

<br/>

#### 📑 Padronização

---

#### 📔 Documentação
- Para acessar documentação, executar aplicação, acessa pelo navegado rota.

`http://localhost:3333/docs`

---

<br/>

#### 🧪 Testes

---

<br/>

#### ⚙️ CI/CD

---

<br/>

#### 🚀 Build

---

Para gerar o build do projeto deve-se abrir no `Visual Code` gerando os arquivos e build da aplicação

```bash
npm build
```

<br/>

#### 🔖 Version

---

- Padronização da estrutura de versionamento

<br/>

#### 📜 Licença

---

Este repositório e projeto possui licença `MIT license`, para maiores informações:

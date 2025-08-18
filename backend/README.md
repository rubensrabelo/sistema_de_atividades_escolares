# Backend

## Descrição
Este projeto é o backend de um Sistema de Atividades Escolares, desenvolvido em TypeScript com Node.js, utilizando MongoDB como banco de dados e JWT para autenticação. Ele permite o gerenciamento de usuários, autenticação e outras funcionalidades relacionadas ao sistema escolar.

## Estrutura do projeto

```bash
backend/
 ├─ src/
 │   ├─ index.ts               # Ponto de entrada da aplicação
 │   ├─ routes/
 │   │    └─ auth.routes.ts    # Rotas de autenticação
 │   ├─ controllers/
 │   │    └─ auth.controller.ts # Lógica das rotas de autenticação
 │   ├─ services/
 │   │    └─ auth.service.ts    # Serviços de autenticação
 │   ├─ models/
 │   │    └─ user.model.ts      # Modelo de usuário
 │   ├─ middlewares/
 │   │    └─ auth.middleware.ts # Middleware de autenticação JWT
 │   ├─ config/
 │   │    └─ db.ts             # Configuração do MongoDB
 ├─ package.json
 ├─ tsconfig.json
 └─ .env                       # Variáveis de ambiente (não versionar)
```
# Backend

## Descrição
Este projeto é o backend de um Sistema de Atividades Escolares, desenvolvido em TypeScript com Node.js, utilizando MongoDB como banco de dados e JWT para autenticação. Ele permite o gerenciamento de usuários, autenticação e outras funcionalidades relacionadas ao sistema escolar.

## Estrutura do projeto

```bash
backend/
 ├─ src/
 │   ├─ index.ts                    # Ponto de entrada da aplicação
 │   ├─ routes/
 │   │    └─ auth.routes.ts         # Rotas de autenticação
 │   ├─ controllers/
 │   │    └─ AuthController.ts      # Controller de autenticação (classe)
 │   ├─ services/
 │   │    └─ AuthService.ts         # Serviços de autenticação (classe)
 │   ├─ models/
 │   │    ├─ interfaces/
 │   │    │    └─ user.interface.ts # Interface do usuário
 │   │    └─ User.ts                # Modelo de usuário (Mongoose)
 │   ├─ dtos/
 │   │    ├─ auth/
 │   │    │    ├─ register.dto.ts   # DTO para registro
 │   │    │    └─ login.dto.ts      # DTO para login
 │   │    └─ user/
 │   │         └─ user-response.dto.ts # DTO de resposta do usuário
 │   ├─ middlewares/
 │   │    ├─ auth.middleware.ts     # Middleware de autenticação JWT
 │   │    └─ validation.middleware.ts # Middleware de validação DTO
 │   ├─ config/
 │   │    ├─ db.ts                  # Configuração do MongoDB
 │   │    └─ env.ts                 # Carregamento das variáveis de ambiente
 ├─ .env                             # Variáveis de ambiente reais (não versionar)
 ├─ .env.example                     # Exemplo de variáveis de ambiente
 ├─ .gitignore                        # Ignorar node_modules, dist, .env etc
 ├─ .dockerignore                     # Ignorar arquivos desnecessários no build
 ├─ Dockerfile                        # Dockerfile da API
 ├─ docker-compose.yml                # Orquestração com MongoDB
 ├─ package.json
 └─ tsconfig.json

```
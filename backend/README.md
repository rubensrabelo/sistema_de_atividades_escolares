# Backend

## Descrição
Este projeto é o backend de um Sistema de Atividades Escolares, desenvolvido em TypeScript com Node.js, utilizando MongoDB como banco de dados e JWT para autenticação. Ele permite o gerenciamento de usuários, autenticação e outras funcionalidades relacionadas ao sistema escolar.

## Diagrama de Classes

```mermaid
classDiagram
  direction LR
  class User {
    - firstName: string
    - lastName: string
    - email: string
    - password: string
    - role: UserRole
    - active: boolean
    - createdAt?: Date
    - updatedAt?: Date
  }

  class Teacher {
  }

  class Student {
  }

  class Course {
    - title: string
    - description?: string
    - active: boolean
    - createBy: string | Types.ObjectId
    - students?: string | Types.ObjectId
    - createdAt?: Date
    - updatedAt?: Date
  }

  class Topic {
    - title: string
    - description?: string
    - type: TopicType
    - course: string | Types.ObjectId
    - createdAt?: Date
    - updatedAt?: Date
  }

  User "1" <|-- Teacher
  User "1" <|-- Student
  Teacher "1" -- "*" Course: creates_a
  Student "1" -- "*" Course: enrolls_in
  Course "1" -- "*" Topic: has_many
```


## Estrutura do projeto

```bash
backend/
 ├─ src/
 │   ├─ index.ts                   # Ponto de entrada da aplicação (inicia servidor)
 │   ├─ routes/                    # Contém os arquivos de rotas da API
 │   ├─ controllers/               # Lógica das rotas (controllers com classes)
 │   ├─ services/                  # Serviços que lidam com a lógica de negócio
 │   ├─ models/                    # Modelos do banco de dados (Mongoose)
 │   │    └─ enums/                # Enums para os modelos
 │   │    └─ interfaces/           # Interfaces TypeScript para os modelos
 │   ├─ dtos/                      # Data Transfer Objects para validação e respostas
 │   │    ├─ auth/                 # DTOs de autenticação (login, registro)
 │   │    └─ course/               # DTOs de cursos (resposta, update, etc.)
 │   │    └─ user/                 # DTOs de usuário (resposta, update, etc.)
 │   ├─ middlewares/               # Middlewares da aplicação (auth, validação, etc.)
 │   └─ config/                    # Configurações do projeto (DB, env, etc.)
 ├─ .env                           # Variáveis de ambiente reais (não versionar)
 ├─ .env.example                   # Exemplo de variáveis de ambiente
 ├─ .gitignore                     # Ignorar node_modules, dist, .env etc
 ├─ .dockerignore                  # Ignorar arquivos desnecessários no build
 ├─ Dockerfile                     # Dockerfile da API
 ├─ docker-compose.yml             # Orquestração com MongoDB
 ├─ package.json                   # Dependências e scripts do Node.js
 └─ tsconfig.json                  # Configuração do TypeScript
```
# 🔐 Cofre de Senhas (CLI Password Manager)

Um gerenciador de senhas seguro e interativo executado diretamente no terminal (Command Line Interface). 

**Motivação:** Decidi utilizar **Node.js e JavaScript** neste projeto com o objetivo de treinar, praticar e consolidar meus conhecimentos utilizando o JS como linguagem pura de Backend. Foi uma excelente oportunidade para aplicar lógica de programação e conceitos reais de banco de dados relacional.

## ✨ Funcionalidades

* **Sistema de Autenticação:** Cadastro e login de usuários.
* **Criptografia de Via Única (Hashing):** As senhas de acesso ao sistema nunca são salvas em texto puro. Elas passam por um processo de Hash com `pbkdf2Sync` e recebem um *Salt* dinâmico para evitar ataques de força bruta.
* **Cofre Seguro (AES-256-CBC):** As senhas dos serviços cadastrados (Netflix, Spotify, etc.) são criptografadas de ponta a ponta. Cada senha possui um Vetor de Inicialização (IV) aleatório de 16 bytes.
* **Gerenciamento de Credenciais:** 
  * Cadastrar novos serviços com login, descrição e senha.
  * Listar senhas destrancadas (descriptografia em tempo real).
  * Excluir senhas do banco de dados.
* **Isolamento de Dados:** Usuários diferentes não conseguem acessar o cofre uns dos outros.

## 🛠️ Tecnologias Utilizadas

* **Node.js** (JavaScript no Backend)
* **MySQL** (Banco de Dados Relacional)
* **Módulo `crypto`** nativo do Node (Criptografia e Hashing)
* **dotenv** (Gerenciamento de variáveis de ambiente)

## 🚀 Como executar o projeto na sua máquina

### Pré-requisitos
* Node.js instalado.
* Um servidor MySQL rodando localmente (ex: XAMPP, DBeaver, MySQL Workbench).

### Passo a Passo

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/leo-furlan12/Gerenciador_de_senhas.git
   cd Gerenciador_de_senhas

# Nexo Art (Projeto Startup One)

"Onde as cores contam a história que as palavras não alcançam."

Nexo Art é um protótipo funcional de uma plataforma de rede social focada em artistas digitais, ilustradores e criadores de mangá.



## 🚀 Sobre o Projeto

Este projeto está sendo desenvolvido como avaliação para a disciplina de **Projeto Aplicado: Startup One** do curso de Análise e Desenvolvimento de Sistemas da Facens.

O objetivo é criar uma plataforma que valorize o artista, combinando a interatividade e senso de comunidade de um feed social (como X/Twitter) com a curadoria visual de um portfólio profissional (como Pinterest,Tumblr ou pixiv).

A plataforma é projetada para resolver um problema central dos artistas em redes sociais genéricas: a dificuldade de expor seus trabalhos de forma organizada e encontrar oportunidades de trabalho (comissões).

## ✨ Recursos Implementados

* **Feed Real-time:** O feed principal carrega os posts diretamente do banco de dados (Supabase).
* **Criação de Posts:** Os usuários podem postar texto e fazer **upload de imagens** (via Supabase Storage).
* **Navegação Completa (Vue Router):** Aplicação de página única (SPA) com rotas para Home, Login, Perfil de Usuário e Detalhe do Post.
* **Perfis de Artista Dinâmicos:** A página de perfil (ex: `/perfil/ArtistaManga`) carrega os dados do artista e exibe suas abas de **"Portfólio"** (em grid) e **"Feed"** (em lista).
* **Foco no Artista:** Recursos únicos como o "Status de Comissão" visível no perfil e no feed, além de uma seção de "Artista em Destaque".
* **Backend Conectado:** O projeto está 100% migrado e funcional com o Supabase, seguindo as diretrizes de backend-as-a-service (BaaS) da disciplina.

## 🛠️ Stack Tecnológico

* **Frontend:** Vue.js 3 (com Vite)
* **Roteamento:** Vue Router
* **Backend (BaaS):** Supabase
* **Banco de Dados:** Supabase (PostgreSQL)
* **Autenticação:** Supabase Auth (Email/Senha, Google OAuth)
* **Armazenamento de Arquivos:** Supabase Storage

## 🚀 Como Executar o Projeto Localmente

1. **Clone o repositório:**
    ```bash
    git clone [https://github.com/PH-77/Startup-one.git](https://github.com/PH-77/Startup-one.git)
    ```

2. **Entre na pasta:**
    ```bash
    cd Startup-one
    ```

3. **Instale as dependências:**
    ```bash
    npm install
    ```

4. **Configure suas Chaves (Backend):**
    * Crie uma conta gratuita no [Supabase](https://supabase.com/).
    * Crie um novo projeto (ex: "nexo-art").
    * Na raiz do seu projeto local, crie um arquivo chamado `.env`
    * Adicione suas chaves do Supabase (encontradas em Configurações > API) ao `.env`:
        ```
        VITE_SUPABASE_URL="SUA_URL_DO_PROJETO"
        VITE_SUPABASE_KEY="SUA_CHAVE_ANON_PUBLIC"
        ```

5. **Configure o Banco de Dados (Supabase):**
    * No painel do Supabase, vá em **Table Editor** e crie a tabela `posts`.
    * Adicione as colunas: `user` (text), `text` (text), `avatarUrl` (text), `imageUrl` (text), `missionStatus` (text) e `created_at` (timestamptz com `now()` como Default Value).
    * Vá em **Storage** e crie um "Bucket" público chamado `uploads`.
    * Vá em **Authentication** > **Policies** e desative o **Row Level Security (RLS)** da tabela `posts` para testes de desenvolvimento (ou crie políticas `SELECT` e `INSERT` com `true`).

6. **Rode o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

7. **Abra no navegador:**
    [http://localhost:5173](http://localhost:5173)



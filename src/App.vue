<template>
    <div class="app-container">
        <header class="col-nav">
            <Navbar />
            <SidebarTags :user="fakeMe" />
        </header>

        <main class="col-feed">
            <router-view />
        </main>

        <aside class="col-recomendados">
            <SidebarRecomendados />
        </aside>
    </div>
</template>

<script setup>
// 1. Importa os componentes da "moldura"
import Navbar from "./components/layout/Navbar.vue";
import SidebarTags from "./components/layout/SidebarTags.vue";
import SidebarRecomendados from "./components/layout/SidebarRecomendados.vue";

// 2. Importa o "usuário logado" do nosso store
import { currentUser } from "./service/store.js";

// 3. Renomeamos para 'fakeMe' para o template funcionar
//    (O template estava usando :user="fakeMe")
const fakeMe = currentUser;
</script>

<style>
/* Estilos globais (sem 'scoped') para o layout */
html,
body,
#app {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: #000; /* Fundo preto padrão */
    color: white; /* Texto branco padrão */
    font-family: Arial, sans-serif;
    overflow-x: hidden; /* Evita rolagem horizontal indesejada */
}

.app-container {
    display: grid;
    grid-template-columns: 250px 1fr 300px; /* Larguras das 3 colunas */
    gap: 20px;
    max-width: 1200px; /* Largura máxima do app */
    margin: 0 auto;
    min-height: 100vh;
    padding: 0 20px;
}

/* Colunas individuais */
.col-nav {
    /* Opcional: para fixar a barra lateral
    (Vamos deixar desativado por enquanto)
    position: sticky;
    top: 0;
    height: 100%;
  */
    padding-top: 20px; /* Espaço do topo */
    display: flex;
    flex-direction: column;
    gap: 20px; /* Espaço entre Navbar e SidebarTags */
}

.col-feed {
    padding-top: 20px;
    border-left: 1px solid #333; /* Linha divisória */
    border-right: 1px solid #333; /* Linha divisória */
    padding-left: 20px;
    padding-right: 20px;
}

.col-recomendados {
    padding-top: 20px;
}

/* Media Query para telas com 1024px de largura ou menos (tablets) */
@media (max-width: 1024px) {
    .app-container {
        grid-template-columns: 1fr; /* 1 coluna (layout do celular) */
        padding: 0;
        margin: 0;
    }

    .col-nav,
    .col-recomendados {
        display: none; /* Esconde as barras laterais em telas pequenas */
    }

    .col-feed {
        border-left: none;
        border-right: none;
        padding: 0 10px;
    }
}

/* Ocultar barra de rolagem (opcional) */
.col-feed::-webkit-scrollbar {
    display: none;
}
.col-feed {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>

<template>
    <aside class="sidebar-recomendados">
        <section class="post-grid">
            <h3>Posts em alta</h3>
            <div class="grid-container">
                <div class="grid-item">📷</div>
                <div class="grid-item">📷</div>
                <div class="grid-item">📷</div>
                <div class="grid-item">📷</div>
            </div>
        </section>

        <section class="post-grid">
            <h3>Posts de quem você segue</h3>
            <div class="grid-container">
                <div class="grid-item">📷</div>
                <div class="grid-item">📷</div>
                <div class="grid-item">📷</div>
                <div class="grid-item">📷</div>
            </div>
        </section>
    </aside>
</template>

<script setup>
// Nenhuma lógica necessária por enquanto
</script>

<style scoped>
.sidebar-recomendados {
    padding: 15px;
    color: white;
    font-family: Arial, sans-serif;
}
h3 {
    border-bottom: 1px solid #444;
    padding-bottom: 10px;
}
.grid-container {
    display: grid;
    /* Cria duas colunas de tamanho igual */
    grid-template-columns: 1fr 1fr;
    gap: 10px; /* Espaço entre os posts */
    margin-top: 10px;
}
.grid-item {
    width: 100%;
    padding-bottom: 100%; /* Truque para criar um quadrado perfeito */
    background-color: #333;
    border-radius: 8px;
    position: relative;

    /* Centraliza o ícone de câmera */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5em;
    color: #666;
}
.post-grid {
    margin-bottom: 25px;
}
</style>

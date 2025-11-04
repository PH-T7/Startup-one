<template>
    <aside class="sidebar-recomendados">
        <section class="featured-artist">
            <h3>Artista em Destaque</h3>

            <router-link to="/perfil/ArtistaDestaque" class="artist-card-link">
                <div class="artist-card">
                    <img
                        src="https://i.pravatar.cc/150?img=14"
                        class="artist-avatar"
                    />
                    <div class="artist-info">
                        <strong>ArtistaDestaque</strong>
                        <span class="artist-status aberto"
                            >Comissões Abertas</span
                        >
                    </div>
                </div>
            </router-link>
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
.featured-artist {
    background-color: #222;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
}

.artist-card-link {
    text-decoration: none;
    color: inherit;
}

.artist-card {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 10px;
}

.artist-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}

.artist-info {
    display: flex;
    flex-direction: column;
}

.artist-info strong {
    font-size: 1.1em;
    font-weight: 600;
}

.artist-status {
    font-size: 0.8em;
    font-weight: 600;
    padding: 3px 6px;
    border-radius: 10px;
    margin-top: 4px;
    align-self: flex-start; /* Faz o badge ter o tamanho do texto */
}

/* Reutilizando as cores que já definimos antes */
.artist-status.aberto {
    background-color: #3aa073;
    color: white;
}
</style>

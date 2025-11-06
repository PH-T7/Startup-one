<template>
    <aside class="sidebar-recomendados">
        <section class="featured-artist">
            <h3>Artista em Destaque</h3>
            <router-link to="/perfil/vialentino" class="artist-card-link">
                <div class="artist-card">
                    <img
                        src="https://i.pinimg.com/736x/4d/f2/20/4df220f7fa1a115dfc8fe1dc42471865.jpg"
                        class="artist-avatar"
                    />
                    <div class="artist-info">
                        <strong>vialentino</strong>
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
                <div class="grid-item">
                    <img
                        src="https://pbs.twimg.com/media/GK_s8A8WAAA-NfY?format=jpg&name=medium"
                        alt="Post"
                    />
                </div>
                <div class="grid-item">
                    <img
                        src="https://pbs.twimg.com/media/GFu8m0tXEAAkqaR?format=jpg&name=medium"
                        alt="Post"
                    />
                </div>
                <div class="grid-item">
                    <img
                        src="https://pbs.twimg.com/media/GI-S-qiaEAABhB0?format=jpg&name=medium"
                        alt="Post"
                    />
                </div>
                <div class="grid-item">
                    <img
                        src="https://pbs.twimg.com/media/GIl89m0WQAAdJcg?format=jpg&name=medium"
                        alt="Post"
                    />
                </div>
            </div>
        </section>
    </aside>
</template>
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
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 10px;
}

/* ATUALIZADO: Estilo para as imagens / .grid-item { width: 100%; border-radius: 8px; background-color: #333; overflow: hidden; / Garante que a imagem se ajuste / } .grid-item img { width: 100%; height: 100%; object-fit: cover; / Faz a imagem cobrir o espaço / } / FIM DA ATUALIZAÇÃO */

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
    align-self: flex-start;
}
.artist-status.aberto {
    background-color: #3aa073;
    color: white;
}
</style>

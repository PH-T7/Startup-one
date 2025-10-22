<template>
    <div class="post-card">
        <div class="post-header">
            <div class="avatar"></div>
            <div class="user-info">
                <strong>Usuario001</strong>
                <p>Olha que arte bonita que eu fiz :D</p>
            </div>
        </div>

        <div class="post-image"></div>

        <div class="post-actions">
            <img src="@/assets/heart.svg" class="icon" />
            <img src="@/assets/message-square.svg" class="icon" />
            <img src="@/assets/edit.svg" class="icon" />

            <span>🔁</span>
            <span>🔖</span>
        </div>
    </div>
</template>

<script setup>
// Aqui é onde a mágica vai acontecer depois (ex: carregar os dados do post)
</script>

<style scoped>
/* "scoped" significa que esse CSS só afeta ESTE componente */
.post-card {
    border: 1px solid #444; /* Borda cinza escura */
    border-radius: 8px;
    background-color: #222; /* Fundo do card escuro */
    color: white; /* Texto branco */
    max-width: 500px; /* Largura máxima do post */
    margin: 20px auto; /* Centraliza o post na tela */
    font-family: Arial, sans-serif;
}

.post-header {
    display: flex;
    align-items: center;
    padding: 10px;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #555;
    margin-right: 10px;
}

.user-info p {
    margin: 0;
    font-size: 0.9em;
}

.post-image {
    width: 100%;
    height: 400px; /* Altura fixa para a imagem */
    background-color: #333; /* Um "placeholder" cinza para a imagem */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 5em;
    color: #666;
}
.post-image::before {
    content: "📷"; /* Ícone de câmera (como no seu wireframe) */
}

.post-actions {
    display: flex;
    justify-content: space-around;
    padding: 15px;
    font-size: 1.5em;
}

.post-actions span {
    cursor: pointer;
}
</style>

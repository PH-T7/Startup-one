<template>
    <aside class="sidebar-menu">
        <div v-if="user" class="my-profile-box">
            <router-link :to="`/perfil/${user.username}`" class="profile-link">
                <Avatar :src="user.avatar_url" class="profile-avatar" />

                <div class="profile-info">
                    <strong>{{ user.username }}</strong>
                    <router-link to="/edit-profile" class="edit-link">
                        Editar Perfil
                    </router-link>
                </div>
            </router-link>
        </div>

        <nav class="tags-nav">
            <h3>Tags em alta</h3>
            <ul>
                <li v-for="tag in tags" :key="tag.name">
                    <router-link :to="`/tags/${tag.name}`"
                        ><strong>#{{ tag.name }}</strong>
                        <span>{{ tag.count }} posts</span></router-link
                    >
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>
import Avatar from "../common/Avatar.vue"; // Importar o Avatar

defineProps({
    user: Object, // Vem do App.vue
    tags: Array,
});
</script>

<style scoped>
/* Estilo para o box "Meu Perfil" */
.my-profile-box {
    padding: 15px;
    border-radius: 8px;
    background-color: #222;
    margin-bottom: 20px;
}

.profile-link {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: white;
}

/* Redefinir tamanho do avatar especificamente aqui */
.profile-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: none; /* Remover borda do Avatar.vue */
}

.profile-info {
    display: flex;
    flex-direction: column;
}

.profile-info strong {
    font-weight: 600;
}

.edit-link {
    font-size: 0.9em;
    color: #aaa;
    text-decoration: none;
}
.edit-link:hover {
    text-decoration: underline;
}

/* Estilo para a navegação de tags (o que você já tinha) */
.tags-nav {
    padding: 15px;
    color: white;
    font-family: Arial, sans-serif;
}

h3 {
    border-bottom: 1px solid #444;
    padding-bottom: 10px;
}

ul {
    list-style-type: none;
    padding: 0;
    margin-top: 15px;
}

li a {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    padding: 5px;
    border-radius: 5px;
}

li a:hover {
    background-color: #222;
}

li strong {
    font-size: 1.1em;
}

li span {
    font-size: 0.9em;
    color: #aaa;
}
</style>

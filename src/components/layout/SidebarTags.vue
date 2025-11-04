<template>
    <aside class="sidebar-menu">
        <div v-if="user" class="my-profile-box">
            <router-link :to="`/perfil/${user.name}`" class="profile-link">
                <img :src="user.avatar" class="profile-avatar" />
                <div class="profile-info">
                    <strong>{{ user.name }}</strong>
                    <span>{{ user.handle }}</span>
                </div>
            </router-link>
        </div>

        <nav class="tags-nav">
            <h3>Tags em alta</h3>
            <ul>
                <li>
                    <router-link to="/tags/tag1"
                        ><strong>tag 1</strong>
                        <span>130 posts</span></router-link
                    >
                </li>
                <li>
                    <router-link to="/tags/tag2"
                        ><strong>tag 2</strong>
                        <span>125 posts</span></router-link
                    >
                </li>
                <li>
                    <router-link to="/tags/tag3"
                        ><strong>tag 3</strong>
                        <span>120 posts</span></router-link
                    >
                </li>
                <li>
                    <router-link to="/tags/tag4"
                        ><strong>tag 4</strong>
                        <span>115 posts</span></router-link
                    >
                </li>
                <li>
                    <router-link to="/tags/tag5"
                        ><strong>tag 5</strong>
                        <span>110 posts</span></router-link
                    >
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script setup>
defineProps({
    user: Object, // Vamos receber o objeto 'fakeMe' aqui
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

.profile-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.profile-info {
    display: flex;
    flex-direction: column;
}

.profile-info strong {
    font-weight: 600;
}

.profile-info span {
    font-size: 0.9em;
    color: #aaa;
}

/* Estilo para a navegação de tags */
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

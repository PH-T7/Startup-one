<template>
    <aside class="sidebar-recomendados">
        <section v-if="featuredArtist" class="featured-artist">
            <h3>Artista em Destaque</h3>
            <router-link
                :to="`/perfil/${featuredArtist.username}`"
                class="artist-card-link"
            >
                <div class="artist-card">
                    <img
                        :src="featuredArtist.avatar_url"
                        class="artist-avatar"
                        alt="Avatar do artista em destaque"
                    />
                    <div class="artist-info">
                        <strong>{{ featuredArtist.username }}</strong>
                        <span
                            v-if="featuredArtist.missionstatus"
                            :class="[
                                'artist-status',
                                featuredArtist.missionstatus
                                    .toLowerCase()
                                    .replace(' ', '-'),
                            ]"
                        >
                            {{ featuredArtist.missionstatus }}
                        </span>
                    </div>
                </div>
            </router-link>
        </section>

        <section class="post-grid">
            <h3>Posts de quem você segue</h3>
            <div class="grid-container" v-if="followingPosts.length > 0">
                <router-link
                    v-for="post in followingPosts"
                    :key="post.id"
                    :to="`/post/${post.id}`"
                    class="grid-item"
                >
                    <img :src="post.image_url" alt="Post" />
                </router-link>
            </div>
            <p v-else class="no-posts-message">
                Você ainda não segue ninguém ou quem você segue não postou nada.
            </p>
        </section>
    </aside>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../../lib/supabaseClient";
import store from "@/lib/store.js";

const featuredArtist = ref(null);
const followingPosts = ref([]); // <-- Nosso novo array

// --- FUNÇÃO PARA BUSCAR ARTISTA EM DESTAQUE (JÁ EXISTIA) ---
async function fetchFeaturedArtist() {
    // --- MUDANÇA AQUI ---
    // A query agora filtra por artistas com comissões abertas
    let query = supabase
        .from("profiles")
        .select("*")
        .eq("missionstatus", "Aberto para comissões") // NOVO FILTRO ESTRATÉGICO
        .not("avatar_url", "is", null) // Garante que o artista tenha avatar
        .limit(10); // Pega até 10 artistas que batem com o filtro

    const { data, error } = await query;

    if (error) {
        console.error("Error fetching featured artist:", error);
    } else if (data) {
        let artists = data;
        if (store.state.currentUser) {
            artists = artists.filter(
                (artist) => artist.id !== store.state.currentUser.id,
            );
        }
        if (artists.length > 0) {
            // A lógica de "aleatório" agora só se aplica
            // DENTRE os artistas que têm comissões abertas
            const randomIndex = Math.floor(Math.random() * artists.length);
            featuredArtist.value = artists[randomIndex];
        }
    }
}

// --- NOVA FUNÇÃO PARA BUSCAR POSTS DE QUEM SEGUIMOS ---
async function fetchFollowingPosts() {
    if (!store.state.currentUser) return;

    try {
        // 1. Pega a lista de IDs de quem seguimos
        const { data: followingList, error: followError } = await supabase
            .from("followers")
            .select("following_id") // Pega só a coluna de quem seguimos
            .eq("follower_id", store.state.currentUser.id); // Onde o seguidor somos nós

        if (followError) throw followError;

        // 2. Extrai apenas os IDs para uma lista simples: ['id1', 'id2', ...]
        const followingIds = followingList.map((item) => item.following_id);

        if (followingIds.length === 0) {
            return; // Não seguimos ninguém, paramos por aqui
        }

        // 3. Busca posts onde o 'user_id' esteja DENTRO da nossa lista de IDs
        const { data: posts, error: postError } = await supabase
            .from("posts")
            .select("id, image_url") // Pega só o ID e a imagem
            .in("user_id", followingIds) // O 'user_id' precisa ser um dos que seguimos
            .not("image_url", "is", null) // Garante que o post tenha imagem
            .order("created_at", { ascending: false })
            .limit(4); // Limita a 4 posts (igual ao seu layout)

        if (postError) throw postError;

        followingPosts.value = posts;
    } catch (error) {
        console.error("Erro ao buscar posts de quem segue:", error.message);
    }
}

onMounted(async () => {
    // Roda as duas funções quando o componente carregar
    await fetchFeaturedArtist();
    await fetchFollowingPosts();
});
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
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 10px;
}

.grid-item {
    width: 100%;
    border-radius: 8px;
    background-color: #333;
    overflow: hidden;
    aspect-ratio: 1 / 1;
}
.grid-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    object-fit: cover;
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
    text-transform: capitalize;
}
.artist-status.aberto {
    background-color: #3aa073;
    color: white;
}
.artist-status.fechado {
    background-color: #d1495b;
    color: white;
}
.artist-status.lista-de-espera {
    background-color: #fca311;
    color: white;
}
.no-posts-message {
    color: #888;
    font-size: 0.9em;
    padding-top: 10px;
}
</style>

<template>
    <div class="create-post-widget">
        <div class="input-row">
            <img
                :src="
                    currentUser
                        ? currentUser.avatar_url
                        : 'https://i.pravatar.cc/150?img=1'
                "
                class="avatar"
                alt="Seu Avatar"
            />

            <input
                type="text"
                class="input-box"
                placeholder="O que você está criando hoje?"
                v-model="newPostText"
            />
        </div>

        <div v-if="selectedFilePreview" class="image-preview">
            <img :src="selectedFilePreview" />
            <button class="remove-image" @click="removeImage">X</button>
        </div>

        <div class="actions-row">
            <button class="icon-button" @click="triggerFileInput">📷</button>

            <input
                type="file"
                ref="fileInput"
                @change="handleFileSelect"
                class="file-input"
                accept="image/png, image/jpeg, image/gif"
            />

            <button
                class="post-button"
                @click="handlePost"
                :disabled="isUploading"
            >
                {{ isUploading ? "Enviando..." : "Postar" }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// 1. IMPORTAR O 'supabase' (para DB) E A NOVA FUNÇÃO 'getPublicUrl'
import { supabase, getPublicUrl } from "../../service/supabase";
import { currentUser } from "../../service/store.js";

const router = useRouter();
const newPostText = ref("");
const isUploading = ref(false); // Para desabilitar o botão de "Postar"

// --- Lógica do Upload ---
const fileInput = ref(null); // Referência para o <input type="file"> escondido
const selectedFile = ref(null); // O arquivo de verdade
const selectedFilePreview = ref(null); // A URL de preview (temporária)

// Função para o botão "📷"
function triggerFileInput() {
    fileInput.value.click(); // Clica no input escondido
}

// Roda quando o usuário seleciona um arquivo
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    selectedFile.value = file;

    // Cria uma URL local SÓ para o preview
    selectedFilePreview.value = URL.createObjectURL(file);
}

// Limpa a seleção de imagem
function removeImage() {
    selectedFile.value = null;
    selectedFilePreview.value = null;
    fileInput.value.value = null; // Limpa o input
}

// --- FIM da Lógica do Upload ---

// FUNÇÃO DE POSTAR (ATUALIZADA PARA UPLOAD)
async function handlePost() {
    if (newPostText.value.trim() === "" && !selectedFile.value) {
        alert("Escreva algo ou adicione uma imagem para postar!");
        return;
    }

    isUploading.value = true;
    let uploadedImageUrl = null;

    try {
        // 1. FAZER UPLOAD DA IMAGEM (se houver)
        if (selectedFile.value) {
            console.log("Enviando arquivo para o Supabase Storage...");

            // Gera um nome de arquivo único
            const fileName = `public/${Date.now()}-${selectedFile.value.name}`;

            const { data: uploadData, error: uploadError } =
                await supabase.storage
                    .from("uploads") // Nome do "bucket"
                    .upload(fileName, selectedFile.value);

            if (uploadError) throw uploadError;

            // 2. PEGAR A URL PÚBLICA (com nossa nova função)
            uploadedImageUrl = getPublicUrl(fileName);
            console.log("Arquivo enviado! URL:", uploadedImageUrl);
        }

        // 3. SALVAR O POST NO BANCO DE DADOS (Database)
        const { error: insertError } = await supabase.from("posts").insert([
            {
                user: currentUser.value.username,
                text: newPostText.value,
                avatarUrl: currentUser.value.avatar_url,
                // Usa a URL do upload! Se não houver, fica nulo.
                imageUrl: uploadedImageUrl,
                commissionStatus: currentUser.value.commission_status,
            },
        ]);

        if (insertError) throw insertError;

        console.log("Post criado com sucesso!");
        removeImage(); // Limpa a imagem
        newPostText.value = ""; // Limpa o texto
        window.location.reload(); // Recarrega para ver o novo post
    } catch (error) {
        console.error("Erro ao adicionar post: ", error.message);
        alert("Erro ao postar: " + error.message);
    } finally {
        isUploading.value = false; // Re-abilita o botão
    }
}
</script>

<style scoped>
.create-post-widget {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #1a1a1a;
    padding: 15px;
    border-bottom: 1px solid #444;
}
.input-row {
    display: flex;
    align-items: center;
    gap: 10px;
}
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.input-box {
    flex-grow: 1;
    padding: 12px;
    background-color: #222;
    border: 1px solid #444;
    border-radius: 20px;
    color: white;
    font-size: 1em;
}
.input-box:focus {
    outline: none;
    border-color: #42b883;
}

/* --- ESTILOS NOVOS --- */
.image-preview {
    position: relative;
    max-height: 200px;
    overflow: hidden;
    border-radius: 16px;
    margin-top: 5px;
}
.image-preview img {
    width: 100%;
    height: auto;
    object-fit: cover;
}
.remove-image {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-weight: bold;
    cursor: pointer;
}

.actions-row {
    display: flex;
    justify-content: space-between; /* Botões em lados opostos */
    align-items: center;
    margin-top: 5px;
}

.icon-button {
    background: none;
    border: none;
    color: #42b883; /* Cor verde (pode mudar) */
    font-size: 1.5em;
    cursor: pointer;
    padding: 5px;
}
.icon-button:hover {
    background-color: #222;
    border-radius: 50%;
}

/* Input de arquivo escondido */
.file-input {
    display: none;
}

.post-button {
    background-color: white;
    color: black;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-weight: 600;
    cursor: pointer;
}
.post-button:disabled {
    background-color: #888;
    cursor: not-allowed;
}
</style>

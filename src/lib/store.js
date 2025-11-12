import { ref } from "vue";
// import { supabase } from "./supabase"; // <-- 1. COMENTE ESTA LINHA

// Usamos 'ref' para que, se este valor mudar,
// todos os componentes que o usam sejam atualizados automaticamente.
export const currentUser = ref({
  name: "PH",
  avatar:
    "https://images.steamusercontent.com/ugc/687144448805587280/6085648611088858DCCDB7A0C088B5A074FE07C3/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
  handle: "@Phael",
});

// Busca o perfil do usuário inicial quando o app carrega, caso já haja uma sessão.
// fetchUserProfile(); // <-- 2. COMENTE ESTA LINHA TAMBÉM

// 3. Se você adicionou a função 'async function fetchUserProfile() {...}',
// comente ela inteira também, para garantir.
/*
async function fetchUserProfile() {
  // ... todo o código supabase ...
}
*/

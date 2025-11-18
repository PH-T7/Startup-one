import { reactive, readonly } from "vue";
import { supabase } from "./supabaseClient";

const state = reactive({
  currentUser: null,
  loading: true, // Começa carregando
});

/**
 * Função helper para buscar o perfil
 */
async function fetchUserProfile(userId) {
  try {
    // A CORREÇÃO ESTAVA AQUI (O '_' FOI REMOVIDO)
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, avatar_url, bio, missionstatus") // Nome da coluna correta
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Erro ao buscar perfil no store:", error);
    return null;
  }
}

/**
 * Função de Login (A VERSÃO CORRETA)
 */
async function signIn(email, password) {
  state.loading = true;

  // 1. Faz o login
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    state.loading = false;
    throw error;
  }

  // 2. AGORA espera o perfil
  const profile = await fetchUserProfile(data.user.id);

  if (!profile) {
    state.loading = false;
    await supabase.auth.signOut();
    throw new Error("Perfil não encontrado após o login.");
  }

  // 3. Define o usuário e termina o carregamento
  state.currentUser = profile;
  state.loading = false;
  return profile;
}

/**
 * Lida com o logout
 */
async function signOut() {
  await supabase.auth.signOut();
  state.currentUser = null;
}

/**
 * FUNÇÃO DE INICIALIZAÇÃO (NOVA)
 */
async function initializeAuth() {
  try {
    // E A CORREÇÃO ESTAVA AQUI (O '_' FOI REMOVIDO)
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      const profile = await fetchUserProfile(session.user.id);
      state.currentUser = profile;
    }
  } catch (e) {
    console.error("Erro na busca de sessão inicial:", e);
    state.currentUser = null;
  } finally {
    state.loading = false;
  }
}

// O listener de Auth
supabase.auth.onAuthStateChange(async (event, session) => {
  console.log("Auth Event:", event);
  if (event === "PASSWORD_RECOVERY") {
    // Lógica futura
  } else if (event === "SIGNED_OUT") {
    state.currentUser = null;
  }
});

export default {
  state: readonly(state),
  signIn,
  signOut,
  initializeAuth, // <-- Exporta a nova função
};

<template>
  <!-- Carrossel de imagens de artistas atrás do login  -->
  <div class="background-carousel">
    <div class="carousel-slide">
      <img
        src="https://pbs.twimg.com/media/G39QCZWW8AAH66k?format=jpg&name=large"
        alt="Background 1"
        data-artist="Meymey🌸"
        data-creator="@Meymey2"
        data-avatar="https://pbs.twimg.com/profile_images/1980416824823988224/qOLpJw26_400x400.jpg"
      >
     <img src="https://pbs.twimg.com/media/G1TZkbiXgAEorle?format=jpg&name=4096x4096"
     alt="Background 2"
     data-artist="Quimera_Ilustra"
     data-creator="@RhuIlustra"
     data-avatar="https://pbs.twimg.com/profile_images/1981083351768285184/0tjyIgJE_400x400.jpg"
     >
      <img src="https://preview.redd.it/fan-art-i-did-cubchoo-goes-weeeee-v0-0zpm5wppb5de1.jpeg?width=1080&crop=smart&auto=webp&s=2c98f0b7cf8520ddb212175515291c5a50ac6771"
     alt="Background 3"
     data-artist="Afnm_sm"
     data-creator="@Sm_afn"
     data-avatar="https://i.redd.it/snoovatar/avatars/1e8df099-d8d0-46a1-b76f-34032e95fd4d.png"
     >

    </div>
  </div>



  <!--Tela de login-->
  <div class="container">
    <div class="login-card">
      <div class="card-logo"></div>


      <transition name="fade-slide" mode="out-in">
      <div v-if="screen === 'login'" key="login">
      <div class="login-title"><h1>Nexo Art</h1></div>
      <div class="tagline">Onde as cores contam a história que as palavras não alcançam.</div>
      <h1 class="login-title">Acesse com sua conta na Nexo Art.</h1>
      <label for="email">Email:</label>
      <input type="email" v-model="email" id="email" class="textoRegistro" placeholder="Digite o seu E-mail">
      <label for="password">Senha:</label>
      <input type="password" v-model="password" class="textoRegistro" placeholder="Digite a sua senha">
      <!-- Esqueci a senha -->
      <div class="forgot-password">
      <button class="link-btn" @click="goToRecovery">Esqueci minha senha</button>
      </div>
      <div v-if="loginError" class="error-message">
      <svg class="error-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      <span class="error-text">{{ loginError }}</span>
      </div>
      <button class="btn-primary login-btn" @click="handleLogin" :disabled="isLoading" type="button">
      {{ isLoading ? "Entrando..." : "Entrar" }}
      </button>
      <button class="btn-primary" @click="toggleMode">Crie uma conta</button>
      <div class="divider">Entrar com uma conta existente</div>
      <div class="social-login">
      <!-- Google -->
         <button class="social-btn" @click="handleSocialLogin('google')" aria-label="Login with Google">
          <svg viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </button>

        <!-- X (Twitter) -->
        <button class="social-btn" @click="handleSocialLogin('x')" aria-label="Login with X">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </button>

        <!-- Facebook -->
        <button class="social-btn" @click="handleSocialLogin('facebook')" aria-label="Login with Facebook">
          <svg viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </button>
      </div>
    </div>



    <!--tela de recuperação de senha-->
    <div v-else-if="screen === 'recovery'" key="recovery">
    <h1 class="login-title">Recuperar senha</h1>
    <p class="info-text">Digite seu e-mail para receber um código de verificação.</p>

    <label for="recovery-email">E-mail:</label>
    <input type="email" v-model="recoveryEmail" class="textoRegistro" placeholder="Seu e-mail" value="24850@facens.br">

    <button class="btn-primary" @click="sendCode" :disabled="isLoading">
      {{ isLoading ? "Enviando..." : "Enviar código" }}
    </button>

    <button class="btn-secondary" @click="screen = 'login'" style="margin-top: 12px;">
      Voltar ao login
    </button>
  </div>
  <!--tela para trocar a senha-->
  <div v-else-if="screen === 'verify'" key="verify">
    <h1 class="login-title">Verificar código</h1>
    <p class="info-text">Digite o código enviado para <strong>{{ recoveryEmail }}</strong></p>

    <label for="code">Código de 6 dígitos:</label>
    <input type="text" v-model="code" class="textoRegistro" placeholder="000000" maxlength="6" value="123456">

    <label for="new-password">Nova senha:</label>
    <input type="password" v-model="newPassword" class="textoRegistro" placeholder="Crie uma nova senha" value="nova123">

    <label for="confirm-new-password">Confirmar senha:</label>
    <input type="password" v-model="confirmNewPassword" class="textoRegistro" placeholder="Repita a nova senha" value="nova123">

    <div v-if="recoveryError" class="error-message">
  <svg class="error-icon" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
  </svg>
  <span class="error-text">{{ recoveryError }}</span>
</div>

    <button class="btn-primary" @click="resetPassword" :disabled="isLoading">
      {{ isLoading ? "Alterando..." : "Alterar senha" }}
    </button>

    <button class="btn-secondary" @click="screen = 'login'" style="margin-top: 12px;">
      Voltar ao login
    </button>
  </div>



    <!--Tela de cadastro-->
    <div v-else-if="screen === 'signup'" key="signup">
        <h1 class="login-title">Crie sua conta na Nexo Art.</h1>

        <div class="field-wrapper">
  <label for="name">Nome completo:</label>
  <input
    type="text"
    v-model="name"
    class="textoRegistro"
    placeholder="Seu nome"
    :class="{ 'error': errors.name }"
  >
  <span v-if="errors.name" class="fb-error">{{ errors.name }}</span>
</div>

<!-- EMAIL -->
<div class="field-wrapper">
  <label for="email">Email:</label>
  <input
    type="email"
    v-model="email"
    class="textoRegistro"
    placeholder="Seu e-mail"
    :class="{ 'error': errors.email }"
  >
  <span v-if="errors.email" class="fb-error">{{ errors.email }}</span>
</div>

<!-- SENHA -->
<div class="field-wrapper">
  <label for="password">Senha:</label>
  <input
    type="password"
    v-model="password"
    class="textoRegistro"
    placeholder="Crie uma senha"
    :class="{ 'error': errors.password }"
  >
  <span v-if="errors.password" class="fb-error">{{ errors.password }}</span>
</div>

<!-- CONFIRMAR SENHA -->
<div class="field-wrapper">
  <label for="confirmPassword">Confirme a senha:</label>
  <input
    type="password"
    v-model="confirmPassword"
    class="textoRegistro"
    placeholder="Repita a senha"
    :class="{ 'error': errors.confirmPassword }"
  >
  <span v-if="errors.confirmPassword" class="fb-error">{{ errors.confirmPassword }}</span>
</div><br></br>

<button
  class="btn-primary"
  @click="handleSignup"
  :disabled="isLoading"
>
  {{ isLoading ? "Criando..." : "Criar conta" }}
</button>
<button
  class="btn-secondary"
  @click="screen = 'login'; isSignup = false; errors = {}"
  style="margin-top: 16px; width: 100%;"
>
  Já tem uma conta?
</button>

      </div>
    </transition>
  </div>
</div>
  <!-- Modelo de perfil do usuario (para aparecer os creditos do artista)-->
  <div class="artist-badge">
    <div class="artist-avatar"></div>
    <div class="artist-info">
      <span class="artist-name"></span>
      <span class="artist-creator"></span>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "../../lib/supabaseClient";
import store from "@/lib/store.js";

// --- Login ---
const email = ref("");
const password = ref("");

// --- Cadastro ---
const name = ref("");
const confirmPassword = ref("");

// --- Controle de UI ---
const router = useRouter();
const isLoading = ref(false);
const isSignup = ref(false);
const errors = ref({})


// --- Mensagens de erro (separadas por tela) ---
const loginError = ref('')
const recoveryError = ref('')


// --- Recuperação de senha ---
const screen = ref('login')
const recoveryEmail = ref('')
const code = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')


// --Alterna do login para a tela de cadastro e limpa todos os campos e erros--
const toggleMode = () => {
  screen.value = 'signup'//Muda a tela de cadastro
  isSignup.value = true //Marca como modo cadastro
  loginError.value = "" //limpa erro do login
  recoveryError.value = "" //limpa erro da recuperação
  email.value = password.value = confirmPassword.value = name.value = "" //Reseta o formulario
}



//Alterna do login para a tela de cadastro e limpa todos os campos
const goToRecovery = () => {
 screen.value = 'recovery'
  recoveryError.value = ''  // limpa erro da recuperação
  loginError.value = ''     // limpa erro do login
}


const handleLogin = async () => {
  loginError.value = "";
  if (!email.value || !password.value) {
    loginError.value = "Por favor, preencha o email e a senha.";
    return;
  }
  isLoading.value = true;
  try {
    // 1. Chama a nova store.signIn e ESPERA
    await store.signIn(email.value, password.value);

    // 2. Se o 'await' terminou sem erro, o currentUser JÁ ESTÁ NO STATE.
    // Agora o redirect vai funcionar.
    router.push("/");

  } catch (error) {
      loginError.value = error.message; // Mostra o erro real
      console.error("Erro real do login:", error);
  } finally {
    isLoading.value = false;
  }
};

const handleSignup = async () => {
  errors.value = {};
  let hasError = false;

  if (!name.value.trim()) {
    errors.value.name = "Digite seu nome completo";
    hasError = true;
  }

  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    errors.value.email = "Email inválido";
    hasError = true;
  }

  if (password.value.length < 6) {
    errors.value.password = "Mínimo 6 caracteres";
    hasError = true;
  }

  if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = "Senhas não coincidem";
    hasError = true;
  }

  if (hasError) return;

  isLoading.value = true;
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          full_name: name.value,
        },
      },
    });

    if (error) {
      errors.value.email = "Este e-mail já está em uso.";
      throw error;
    }

    if (data) {
      alert("Cadastro realizado! Por favor, verifique seu e-mail para confirmar a conta.");
      screen.value = 'login';
    }
  } catch (error) {
    console.error("Erro no cadastro:", error.message);
    if (error.message.includes("already registered")) {
        errors.value.email = "Este e-mail já está em uso.";
    } else {
        errors.value.password = error.message;
    }
  } finally {
    isLoading.value = false;
  }
};


const handleSocialLogin = async (provider) => {
  isLoading.value = true;
  try {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) throw error;
  } catch (error) {
    loginError.value = `Erro ao fazer login com ${provider}.`;
  } finally {
    isLoading.value = false;
  }
};


const sendCode = async () => {
  isLoading.value = true;
  recoveryError.value = '';
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(recoveryEmail.value);
    if (error) throw error;
    alert(`E-mail de recuperação enviado para ${recoveryEmail.value}`);
    screen.value = 'verify';
  } catch (error) {
    recoveryError.value = "Erro ao enviar e-mail de recuperação.";
  } finally {
    isLoading.value = false;
  }
};


const resetPassword = async () => {
  recoveryError.value = '';

  if (newPassword.value !== confirmNewPassword.value) {
    recoveryError.value = 'As senhas não coincidem.';
    return;
  }

  isLoading.value = true;
  try {
    // This part is tricky. The user needs to be logged in to update their password.
    // The flow is: user clicks link in email, gets redirected to a page with a token.
    // For simplicity here, we'll assume the user is already logged in via the recovery token.
    // A full implementation would handle the token from the URL.
    const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword.value
    });

    if (updateError) throw updateError;

    // After updating, log the user in with the new password
    const { error: signInError } = await supabase.auth.signInWithPassword({
        email: recoveryEmail.value,
        password: newPassword.value,
    });

    if (signInError) throw signInError;

    alert('Senha alterada com sucesso! Você foi logado.');
    router.push('/');

  } catch (error) {
    recoveryError.value = 'Erro ao alterar a senha: ' + error.message;
  } finally {
    isLoading.value = false;
  }
};



//1 - Configura carrossel de imagens de fundo com créditos de artistas
//2 - Seleciona imagens e elementos do DOM
//3 - Ajusta largura do container
//4 - Atualiza posição, nome, criador e avatar a cada 5s
onMounted(() => {
  const carousel = document.querySelector(".carousel-slide");
  if (!carousel) {
    console.error("Elemento .carousel-slide não encontrado.");
    return;
  }

  const images = carousel.querySelectorAll("img");
  const totalImages = images.length;
  if (totalImages === 0) {
    console.error("Nenhuma imagem encontrada no carrossel.");
    return;
  }

  const artistName = document.querySelector(".artist-name");
  const artistCreator = document.querySelector(".artist-creator");
  const avatarEl = document.querySelector(".artist-avatar");
  let index = 0;

  // Configuração do carrossel
  carousel.style.width = `${100 * totalImages}vw`;
  carousel.style.display = "flex";


//1 - Atualiza slide atual:
//2 - Move carrossel com translateX
//3 - Atualiza nome do artista
//4 - Atualiza criador (@handle)
//5 - Atualiza avatar com imagem do data-avatar
const updateCarousel = () => {
    // Atualiza posição do carrossel
    const translateValue = -(index * (100 / totalImages));
    carousel.style.transform = `translateX(${translateValue}%)`;

    const currentImage = images[index];

    if (currentImage) {
      // Atualiza nome do artista
      artistName.textContent = currentImage.dataset.artist || "Artista Desconhecido";

      // Atualiza criador
      artistCreator.textContent = `${
        currentImage.dataset.creator || "Criador Desconhecido"
      }`;



      // ATUALIZA AVATAR (agora dentro da função!)
      const avatarUrl = currentImage.dataset.avatar;
      if (avatarUrl) {
        avatarEl.style.backgroundImage = `url(${avatarUrl})`;
        avatarEl.style.backgroundSize = "cover";
        avatarEl.style.backgroundPosition = "center";
      } else {
        avatarEl.style.backgroundImage = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      }
    }
  };


//Avança para próximo slide
  const nextSlide = () => {
    index = (index + 1) % totalImages;
    updateCarousel();
  };

  // Inicia com a primeira imagem
  updateCarousel();

  // Troca a cada 5 segundos
  const intervalId = setInterval(nextSlide, 5000);
  console.log("Carrossel iniciado com sucesso! ID:", intervalId);
});
</script>



<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

/* Carrossel de fundo (se usado) */
.background-carousel {
  content: '';
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.carousel-slide {
position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  will-change: transform;
  transition: transform 1.2s ease-in-out;
    overflow: hidden;
}

.carousel-slide img {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  flex-shrink: 0;
  filter: brightness(0.75) contrast(1.1); /* Leve melhora na arte */
    overflow: hidden;
}

.background-carousel::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(15, 15, 25, 0.75); /* Cinza-azulado escuro, mais suave que preto */
  backdrop-filter: blur(8px);
  z-index: 1;
  pointer-events: none;
    overflow: hidden;
}


/* Main Container */
.container {
  position: relative;
  z-index: 2; /* Acima do overlay */
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
    overflow: hidden;
}

/* Login Card */
.login-card {
  background: rgba(20, 20, 30, 0.85) !important;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  padding: 48px 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  text-align: center;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(16px);
  color: #f0f0f0 !important;
    overflow: hidden;
}

.card-logo {
  font-size: 48px;
  font-weight: bold;
  color: #0096FA;
  margin-bottom: 8px;
  letter-spacing: -2px;
}

.tagline {
  color: #ff8e53 !important;
  background: linear-gradient(90deg, #ff6f61, #ffab91);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 17px;
  margin-bottom: 32px;
  font-weight: 500;
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
  letter-spacing: 0.8px;
}

.login-title {
color: #ffffff !important;
  font-size: 26px;
  margin-bottom: 28px;
  font-weight: 700;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  letter-spacing: -0.5px;
  line-height: 1.3;
}

/* Labels e Inputs */
label {
  display: block;
  font-size: 15px;
  color: #e0e0e0 !important;
  margin-bottom: 8px;
  text-align: left;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  letter-spacing: 0.3px;
}

label::before {
  content: '★';
  color: #ff8e53;
  margin-right: 6px;
  font-size: 12px;
  opacity: 0.8;
}

.textoRegistro {
width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  font-size: 16px;
  margin-bottom: 16px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.12);
  color: #ffffff !important;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
}

.textoRegistro::placeholder {
 color: rgba(255, 255, 255, 0.5) !important;
  font-style: normal;
}

.textoRegistro:focus {
border-color: #0096FA !important;
  background-color: rgba(255, 255, 255, 0.18) !important;
  box-shadow: 0 0 0 3px rgba(0, 150, 250, 0.2) !important;
  transform: translateY(-1px);
}

/* Buttons */
.btn-primary {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #0096FA, #0078c7) !important;
  color: white !important;
  border: none;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 16px;
  box-shadow: 0 4px 15px rgba(0, 150, 250, 0.3);
}

.btn-primary:hover {
background: linear-gradient(135deg, #0078c7, #005a99) !important;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 150, 250, 0.4);
}

.btn-secondary {
background: transparent !important;
  border: 1.5px solid rgba(255, 255, 255, 0.3) !important;
  color: #e0e0e0 !important;
  padding: 14px;
  border-radius: 14px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
 background: rgba(255, 255, 255, 0.15) !important;
  border-color: #0096FA !important;
  color: #ffffff !important;
}

/* Divider */
.divider {
  color: rgba(255, 255, 255, 0.5) !important;
  font-size: 14px;
  margin: 24px 0;
  font-family: 'Inter', sans-serif;
  font-weight: 500;

}

/* Social Login */
.social-login {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
}

.social-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.25) !important;
  background: rgba(255, 255, 255, 0.12) !important;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.2) !important;
  border-color: #0096FA !important;
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 150, 250, 0.25);
}

.social-btn svg {
  width: 24px;
  height: 24px;
}

/* Footer Text */
.footer-text {
  font-size: 11px;
  color: #999;
  line-height: 1.5;
}

.footer-text a {
  color: #0096FA;
  text-decoration: none;
}

.footer-text a:hover {
  text-decoration: underline;
}

/* Artist Badge */
.artist-badge {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7) !important;
  padding: 12px 16px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  color: #fff !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.artist-info {
  display: flex;
  flex-direction: column;
}

.artist-name {
  font-weight: bold;
}

.artist-creator {
  font-size: 12px;
  color: #fff !important;
}

.artist-avatar {
  width: 40px;/* Aumentei um pouco para melhor visualização */
  height: 40px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 2px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
  transition: all 0.3s ease; /* Suave ao trocar */
}

/* Responsive */
@media (max-width: 640px) {
  .login-card {
    padding: 32px 24px;
  }

  .artist-badge {
    bottom: 12px;
    right: 12px;
    font-size: 12px;
    padding: 8px 12px;
  }
}

.error-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: rgba(211, 47, 47, 0.2) !important;
  color: #ff8a80 !important;
  font-family: 'Lora', serif;
  font-weight: 600;
  font-size: 15px;
  padding: 14px 18px;
  border-radius: 16px;
  border: 1px solid rgba(211, 47, 47, 0.4) !important;
  margin: 18px 0;
  box-shadow: 0 4px 12px rgba(230, 74, 74, 0.15);
  animation: fadeIn 0.4s ease-out;
  backdrop-filter: blur(4px);
  text-align: center;
  transition: all 0.3s ease;
}

.error-message:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(230, 74, 74, 0.2);
}

.error-icon {
  width: 22px;
  height: 22px;
  color: #e53935;
  flex-shrink: 0;
}

.error-text {
  letter-spacing: 0.3px;
  line-height: 1.4;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 640px) {
  .error-message {
    font-size: 14px;
    padding: 12px 16px;
    gap: 8px;
    margin: 16px 0;
  }
  .error-icon { width: 20px; height: 20px; }
}


.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from { opacity: 0; transform: translateX(30px); }
.fade-slide-leave-to   { opacity: 0; transform: translateX(-30px); }


.btn-primary.login-btn {
  background: linear-gradient(135deg, #28a745, #218838) !important;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

.btn-primary.login-btn:hover {
  background: linear-gradient(135deg, #218838, #1e7e34) !important;
  box-shadow: 0 8px 20px rgba(40, 167, 69, 0.4);
}


.error-column {
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
}
.error-message .error-text {
  font-size: 14px;
  line-height: 1.4;
}


.field-wrapper {
  position: relative;
  margin-bottom: 20px;
}

.textoRegistro.error {
  border-color: #ff6b6b !important;
  box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2) !important;
}

.fb-error {
 color: #ff6b6b !important;
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}


/*aqui é pra nao ter o scroll no site. */
html, body {
  overflow: hidden;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #0f0f19; /* Fundo de segurança */
}

#app {
  height: 100%;
  position: relative;
}


.forgot-password {
  text-align: left;
  margin: -8px 0 20px;
}

.link-btn {
  background: none;
  border: none;
  color: #ff8e53;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  font-family: 'Inter', sans-serif;
}

.link-btn:hover {
  color: #ff6f61;
}

.info-text {
font-family: 'Inter', 'Segoe UI', -apple-system, sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #e0e0e0;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 24px;
  letter-spacing: 0.2px;
  opacity: 0.95;
  transition: all 0.3s ease;

  /* Destaque sutil no strong */
  strong {
    color: #ffffff;
    font-weight: 600;
    background: linear-gradient(90deg, #ff8e53, #ff6f61);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-style: italic;
  }

  /* Efeito ao passar o mouse (opcional, mas bonito) */
  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }
}
</style>

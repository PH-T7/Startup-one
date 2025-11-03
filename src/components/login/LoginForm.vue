<template>
  <!-- Carrossel de imagens de artistas atrás do login (opcional, comente se quiser usar o fundo estático) -->
  <div class="background-carousel">
    <div class="carousel-slide">
      <img
        src="https://pbs.twimg.com/media/G39QCZWW8AAH66k?format=jpg&name=large"
        alt="Background 1"
        data-artist="Meymey🌸"
        data-creator="Criador 1"
        data-avatar="https://pbs.twimg.com/profile_images/1980416824823988224/qOLpJw26_400x400.jpg"
      >
     <img src="https://pbs.twimg.com/media/G1TZkbiXgAEorle?format=jpg&name=4096x4096" 
     alt="Background 2"
     data-artist="Quimera_Ilustra"
     data-creator="@RhuIlustra"
     data-avatar="https://pbs.twimg.com/profile_images/1981083351768285184/0tjyIgJE_400x400.jpg"
     >
      <!-- Adicione mais imagens com data-artist e data-creator conforme necessário -->
      <!-- Exemplo:
      <img src="URL_DA_IMAGEM_2" alt="Background 2" data-artist="Artista 2" data-creator="Criador 2">
      <img src="URL_DA_IMAGEM_3" alt="Background 3" data-artist="Artista 3" data-creator="Criador 3">
      -->
    </div>
  </div>

  <!-- Fundo estático (descomente e comente o background-carousel se preferir usar apenas uma imagem) -->
  <!--
  <div class="background">
    <img src="https://static0.cbrimages.com/wordpress/wp-content/uploads/2020/03/soul-society.jpg" alt="Background">
  </div>
  -->

  <!-- Tela de Login -->

  <div class="container">
    <div class="login-card">
      <div class="card-logo"></div>
      
      
      <transition name="fade-slide" mode="out-in">
      <div v-if="!isSignup" key="login">
      <div class="tagline">Onde as cores contam a história que as palavras não alcançam.</div>
      <h1 class="login-title">Acesse com sua conta na Nexo Art.</h1>
      <label for="email">Email:</label>
      <input type="email" v-model="email" id="email" class="textoRegistro" placeholder="Digite o seu E-mail">
      <label for="password">Senha:</label>
      <input type="password" v-model="password" class="textoRegistro" placeholder="Digite a sua senha">
      <div v-if="errorMessage" class="error-message">
      <svg class="error-icon" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
      <span class="error-text">{{ errorMessage }}</span>
      </div>
      <button class="btn-secondary" @click="handleLogin" :disabled="isLoading" type="button">
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
    


    <!--Tela de cadastro-->
    <div v-else key="signup">
        <h1 class="login-title">Crie sua conta na Nexo Art.</h1>

        <label for="name">Nome completo:</label>
        <input type="text" v-model="name" class="textoRegistro" placeholder="Seu nome">

        <label for="email">Email:</label>
        <input type="email" v-model="email" class="textoRegistro" placeholder="Seu e-mail">

        <label for="password">Senha:</label>
        <input type="password" v-model="password" class="textoRegistro" placeholder="Crie uma senha">

        <label for="confirmPassword">Confirme a senha:</label>
        <input type="password" v-model="confirmPassword" class="textoRegistro" placeholder="Repita a senha">

        <div v-if="signupError" class="error-message">
          <svg class="error-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          <span class="error-text">{{ signupError }}</span>
        </div>

        <button class="btn-primary" @click="handleSignup" :disabled="isLoading">
          {{ isLoading ? "Criando..." : "Criar conta" }}
        </button>
        <button class="btn-secondary" @click="toggleMode">
          Já tem conta? Entrar
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
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";



// Referências reativas
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();
const isLoading = ref(false);



const toggleMode = () => {
  isSignup.value = !isSignup.value;
  errorMessage.value = "";
  signupError.value = "";
  email.value = password.value = confirmPassword.value = name.value = "";
  
};




const handleLogin = async () => {
  errorMessage.value = ""; 

  // --- 1. Validação Simples ---
  if (!email.value || !password.value) {
    errorMessage.value = "Por favor, preencha o email e a senha.";
    return; // Para a execução
  }
    isLoading.value = true; // Desabilita botão

  try {
    // Simulação de login (substitua por API real depois)
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email.value === "24850@facens.br" && password.value === "123") {
      console.log("Login bem-sucedido!");
      router.push('/Home');
    } else {
      errorMessage.value = "Email ou senha inválidos.";
    }
  } catch (err) {
    errorMessage.value = "Erro ao fazer login. Tente novamente.";
  } finally {
    isLoading.value = false;
  }
};
const handleSocialLogin = (provider) => {
  console.log(`Social login with ${provider}`);
  alert(`Login com ${provider}...`);
};

// Configuração do carrossel
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

const isSignup = ref(false); // false = login, true = cadastro

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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
   background-color: black;
}

.carousel-slide {
 display: flex;
   /* Define largura para 2 imagens (100% por imagem) */
  height: 100%;
  will-change: transform;
  transition: transform 1.2s ease-in-out;
}

.carousel-slide img {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  flex-shrink: 0;
  filter: brightness(0.8); /* escurece levemente para o texto sobressair */
  image-rendering: auto; /* melhora qualidade em telas grandes */
}

.background-carousel::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
}

/* Fundo estático (se usado) */
/*.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(3px);
}

.background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
}*/

/* Main Container */
.container {
  position: relative;
  z-index: 1;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* Login Card */
.login-card {
  background: white;
  border-radius: 24px;
  padding: 48px 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  text-align: center;
}

.card-logo {
  font-size: 48px;
  font-weight: bold;
  color: #0096FA;
  margin-bottom: 8px;
  letter-spacing: -2px;
}

.tagline {
  color: #ff6f61; /* Coral suave com gradiente */
  background: linear-gradient(45deg, #ff6f61, #ff8e53);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 18px;
  margin-bottom: 32px;
  font-weight: 500;
  font-family: 'Playfair Display', serif; /* Fonte elegante e cursiva */
  text-align: center;
  letter-spacing: 1px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.login-title {
  color: #2c3e50; /* Azul escuro sofisticado */
  font-size: 24px;
  margin-bottom: 24px;
  font-weight: 700;
  font-family: 'Montserrat', sans-serif; /* Fonte moderna e bold */
  text-transform: uppercase;
  text-align: center;
  position: relative;
}

/* Labels e Inputs */
label {
  display: block;
  font-size: 16px;
  color: #34495e; /* Azul acinzentado elegante */
  margin-bottom: 8px;
  text-align: left;
  font-family: 'Lora', serif; /* Fonte serifada refinada */
  font-weight: 600;
  position: relative;
}

label::before {
  content: '★';
  color: #ff6f61;
  margin-right: 5px;
  opacity: 0.7;
}

.textoRegistro {
 width: 100%;
  padding: 12px;
  border: 2px solid #ffffff;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 15px;
  outline: none;
  background-color: transparent;
  color: #333;
  box-sizing: border-box;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}

.textoRegistro::placeholder {
 color: #666;
  font-style: italic;;
}

.textoRegistro:focus {
border-color: #ffffff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
}

/* Buttons */
.btn-primary {
  width: 100%;
  padding: 14px 24px;
  background: #0096FA;
  color: white;
  border: none;
  border-radius: 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 16px;
}

.btn-primary:hover {
  background: #0086E0;
}

.btn-secondary {
 background: #28a745;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  padding: 14px 24px;
  border-radius: 24px;
  margin-bottom: 32px;
  transition: background 0.2s;
}

.btn-secondary:hover {
  background: #218838;
}

/* Divider */
.divider {
  color: #999;
  font-size: 13px;
  margin-bottom: 20px;
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
  border: 1px solid #e0e0e0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.social-btn:hover {
  border-color: #0096FA;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 150, 250, 0.2);
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
  background: rgba(255, 255, 255, 0.95);
  padding: 12px 16px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  color: #666;
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
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  color: #c62828;
  font-family: 'Lora', serif;
  font-weight: 600;
  font-size: 15px;
  padding: 14px 18px;
  border-radius: 16px;
  border: 1.5px solid #ef9a9a;
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

</style>
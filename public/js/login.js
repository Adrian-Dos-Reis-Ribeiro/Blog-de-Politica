


// Translation Dictionary
const translations = {
  pt: {
    welcome_back: "Bem-vindo de volta.",
    login_subtitle: "Por favor, identifique-se para continuar.",
    label_username: "Usuário",
    label_email: "Email",
    label_password: "Senha",
    btn_enter: "Entrar",
    back_to_blog: "← Voltar ao Blog"
  }
};

// Language Detection and Translation
function updateContent() {
  const lang = navigator.language || navigator.userLanguage;
  if (lang.toLowerCase().startsWith('pt')) {
    // Translate text content
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations.pt[key]) {
        element.innerText = translations.pt[key];
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', updateContent);

// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});




// Translation Dictionary
const translations = {
  pt: {
    blog_title: "Blog Política",
    blog_subtitle: "Análises sobre esquerda e direita no Brasil",
    nav_login: "Login",
    nav_home: "Início",
    nav_articles: "Artigos",
    nav_about: "Sobre",
    nav_contact: "Contato",
    latest_posts: "Últimas Publicações",
    cat_left: "Esquerda",
    post1_title: "A Dialética do Discurso Político Moderno",
    post1_excerpt: "Uma análise profunda sobre como as narrativas se constroem e se descontroem no cenário atual. O debate público exige mais do que opiniões rasas; exige fundamento e história.",
    author_by: "por Adrian Dos Reis Ribeiro",
    read_article: "Ler artigo",
    cat_right: "Direita",
    post2_title: "Liberdade Econômica e Responsabilidade Social",
    post2_excerpt: "Explorando os pilares do conservadorismo e do liberalismo econômico no contexto brasileiro. Como equilibrar o livre mercado com as demandas de uma sociedade desigual?",
    cat_center: "Centro",
    post3_title: "O Caminho do Meio: Utopia ou Realidade?",
    post3_excerpt: "Em um mundo polarizado, a busca pelo consenso se torna um ato revolucionário. Analisando as possibilidades de uma terceira via efetiva.",
    widget_editor: "Editor Chefe",
    editor_bio: "Observador crítico da política nacional. Buscando a verdade através dos fatos e da retórica.",
    widget_ideology: "Navegue por Ideologia",
    cat_elections: "Eleições",
    search_placeholder: "Buscar...",
    rights_reserved: "Todos os direitos reservados.",
    footer_tagline: "Design Premium & Minimalista"
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

    // Translate attributes (like placeholders)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      if (translations.pt[key]) {
        element.placeholder = translations.pt[key];
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

  // Dot follows instantly
  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // Outline follows with slight delay (handled by CSS transition, we just set position)
  // To make it smoother in JS, we could use requestAnimationFrame, 
  // but CSS transition on top/left or transform is easier for simple effect.
  // Actually, for best performance let's use animate() or simple tracking
  
  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});

// Scroll Reveal Animation
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: Stop observing once revealed
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
  observer.observe(el);
});

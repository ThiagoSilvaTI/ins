// ============================================
// MENU HAMBURGER - COMPLETO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      nav.classList.toggle('nav-open');
      document.body.style.overflow = nav.classList.contains('nav-open') ? 'hidden' : '';
    });

    // Fechar menu ao clicar em qualquer link
    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          closeMenu();
        }
      });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768 && 
          !e.target.closest('header') && 
          !e.target.closest('.menu-toggle')) {
        closeMenu();
      }
    });

    // Reset ao redimensionar
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });

    function closeMenu() {
      menuToggle.classList.remove('active');
      nav.classList.remove('nav-open');
      document.body.style.overflow = '';
    }
  }
});

// ============================================
// DROPDOWN MOBILE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  var dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(function(dropdown) {
    var btn = dropdown.querySelector('.dropdown-btn');
    
    if (btn) {
      btn.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          
          dropdowns.forEach(function(d) {
            if (d !== dropdown && d.classList.contains('active')) {
              d.classList.remove('active');
            }
          });
          
          dropdown.classList.toggle('active');
        }
      });
    }
  });
  
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      if (!e.target.closest('.dropdown')) {
        dropdowns.forEach(function(d) {
          d.classList.remove('active');
        });
      }
    }
  });
  
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      dropdowns.forEach(function(d) {
        d.classList.remove('active');
      });
    }
  });
});

// ============================================
// FILTRO DE NOTÍCIAS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(function(b) {
        b.classList.remove('active');
      });
      this.classList.add('active');
      
      var filtro = this.dataset.filter;
      var noticias = document.querySelectorAll('.news-card, .noticia-mini, .featured-card, .noticia-destaque');
      
      noticias.forEach(function(noticia) {
        var categoria = noticia.getAttribute('data-category');
        if (filtro === "todos" || categoria === filtro) {
          noticia.classList.remove('hidden-news');
        } else {
          noticia.classList.add('hidden-news');
        }
      });
    });
  });
});

// ============================================
// WHATSAPP
// ============================================
function enviarWhats() {
  var organizacao = document.getElementById("organizacao") ? document.getElementById("organizacao").value : "";
  var nome = document.getElementById("nome") ? document.getElementById("nome").value : "";
  var email = document.getElementById("email") ? document.getElementById("email").value : "";
  var telefone = document.getElementById("telefone") ? document.getElementById("telefone").value : "";
  var assunto = document.getElementById("assunto") ? document.getElementById("assunto").value : "";
  var mensagem = document.getElementById("mensagem") ? document.getElementById("mensagem").value : "";

  var texto = "Olá! Vim pelo site do Instituto Semeando Vidas.\n\n" +
    "Nome: " + nome + "\n" +
    "Email: " + email + "\n" +
    "Telefone: " + telefone + "\n" +
    "Assunto: " + assunto + "\n" +
    "Organização: " + organizacao + "\n\n" +
    "Mensagem:\n" + mensagem;

  var numero = "5598985540110";
  var url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(texto);
  window.open(url, "_blank");
}

// ============================================
// NAVEGAÇÃO
// ============================================
function navigate(page) {
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });
  document.querySelectorAll('nav a').forEach(function(a) {
    a.classList.remove('active');
  });
  
  var pageEl = document.getElementById('page-' + page);
  if (pageEl) pageEl.classList.add('active');
  
  var navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Fecha menu mobile
  var menuToggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('nav');
  if (menuToggle && nav && window.innerWidth <= 768) {
    menuToggle.classList.remove('active');
    nav.classList.remove('nav-open');
    document.body.style.overflow = '';
  }
}

// ============================================
// CSS INJECT
// ============================================
var style = document.createElement('style');
style.textContent = '.hidden-news { display: none !important; }';
document.head.appendChild(style);

console.log('✅ global.js carregado');
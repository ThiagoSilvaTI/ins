// news-manager.js - Gerenciamento centralizado de notícias

// Notícias padrão para inicializar o sistema
const DEFAULT_NEWS = [
  {
    id: 1700000000001,
    title: "Projeto Semeando Vidas alcança mais de 5 mil pessoas no Maranhão",
    category: "comunidade",
    summary: "Uma trajetória de transformação social e prevenção ao uso de drogas que cresce a cada ano, impactando positivamente comunidades em todo o estado.",
    content: "O Projeto Semeando Vidas, iniciativa da ASFUJEMA, tem transformado realidades em todo o Maranhão. Com mais de 5 mil pessoas impactadas diretamente, o projeto leva informação, esperança e oportunidades para comunidades que mais precisam. As ações incluem palestras educativas, oficinas culturais e apoio psicossocial para famílias em situação de vulnerabilidade.\n\nO projeto já realizou mais de 200 palestras em escolas públicas, centros comunitários e eventos institucionais, sempre com o objetivo de prevenir o uso de drogas e promover cidadania.",
    image: "https://asfujema.org.br/wp-content/uploads/2025/12/capa-candio-mendes.jpg",
    date: "Fevereiro 2025"
  },
  {
    id: 1700000000002,
    title: "Programa de Prevenção entra em 10 novas escolas públicas",
    category: "educacao",
    summary: "Iniciativa leva conhecimento e conscientização sobre os riscos das drogas para adolescentes e jovens da rede estadual de ensino.",
    content: "O programa de prevenção às drogas do Instituto Semeando Vidas foi expandido para 10 novas escolas públicas da rede estadual. As atividades incluem palestras interativas, rodas de conversa e distribuição de materiais educativos, alcançando mais de 2.000 jovens neste semestre.\n\nOs alunos participam de atividades dinâmicas que abordam os riscos do consumo de drogas, a importância da saúde mental e o fortalecimento de vínculos familiares.",
    image: "https://asfujema.org.br/wp-content/uploads/2024/07/foto-sobre.jpg",
    date: "Janeiro 2025"
  },
  {
    id: 1700000000003,
    title: "Parceria com Secretaria de Saúde fortalece ações preventivas",
    category: "parcerias",
    summary: "Nova colaboração amplia o alcance do projeto e qualifica o atendimento às comunidades atendidas.",
    content: "O Instituto Semeando Vidas firmou uma importante parceria com a Secretaria de Saúde do Estado do Maranhão. A colaboração permitirá a ampliação das ações preventivas e o fortalecimento do atendimento psicossocial oferecido às comunidades atendidas pelo projeto.\n\nA parceria prevê a capacitação de profissionais de saúde para atuarem na identificação precoce de casos de dependência química e no encaminhamento para tratamento adequado.",
    image: "https://image2url.com/r2/default/images/1773005276837-52f41975-41a5-47fb-acf8-98ddcfd662b0.jpeg",
    date: "Dezembro 2024"
  },
  {
    id: 1700000000004,
    title: "Carnaval com Consciência: campanha 'Diga Não às Drogas'",
    category: "eventos",
    summary: "Ação educativa durante o período carnavalesco conscientiza foliões sobre os perigos do consumo de drogas.",
    content: "Durante o Carnaval, o Instituto Semeando Vidas lançou a campanha 'Haja com Sabedoria, Semeie Vidas, Diga Não às Drogas'. A ação distribuiu materiais educativos e realizou abordagens conscientizadoras em pontos de grande concentração de foliões.\n\nA campanha alcançou mais de 3.000 pessoas, promovendo mensagens de prevenção e cuidado com a saúde durante o período festivo.",
    image: "https://image2url.com/r2/default/images/1773004858817-02ea84c3-be47-4cab-b699-b9f000572f2d.jpeg",
    date: "Fevereiro 2026"
  }
];

// Inicializar localStorage se estiver vazio
function initializeNews() {
  const existing = localStorage.getItem('institute_news');
  if (!existing || existing === 'null' || existing === '[]') {
    localStorage.setItem('institute_news', JSON.stringify(DEFAULT_NEWS));
    console.log("✅ Notícias inicializadas com sucesso!", DEFAULT_NEWS.length);
    return true;
  }
  console.log("✅ Notícias já existem:", JSON.parse(existing).length);
  return false;
}

// Carregar todas as notícias
function loadNews() {
  initializeNews(); // Garante que sempre tenha notícias
  const news = localStorage.getItem('institute_news');
  return news ? JSON.parse(news) : [];
}

// Salvar notícias
function saveNews(news) {
  localStorage.setItem('institute_news', JSON.stringify(news));
  // Disparar evento para atualizar outras páginas
  window.dispatchEvent(new Event('storage'));
  console.log("💾 Notícias salvas:", news.length);
}

// Adicionar nova notícia
function addNews(newsItem) {
  const news = loadNews();
  const newNews = {
    ...newsItem,
    id: Date.now()
  };
  news.unshift(newNews);
  saveNews(news);
  return newNews;
}

// Atualizar notícia
function updateNews(id, updatedData) {
  const news = loadNews();
  const index = news.findIndex(item => item.id === id);
  if (index !== -1) {
    news[index] = { ...news[index], ...updatedData };
    saveNews(news);
    return true;
  }
  return false;
}

// Deletar notícia
function deleteNews(id) {
  const news = loadNews();
  const filtered = news.filter(item => item.id !== id);
  saveNews(filtered);
  return filtered.length !== news.length;
}

// Obter categorias
function getCategoryName(category) {
  const categories = {
    'educacao': '📚 Educação',
    'prevencao': '🛡️ Prevenção',
    'comunidade': '🏘️ Comunidade',
    'eventos': '🎉 Eventos',
    'parcerias': '🤝 Parcerias'
  };
  return categories[category] || category;
}

// Formatar data
function formatNewsDate(dateStr) {
  if (dateStr && dateStr !== 'undefined' && dateStr !== 'null') return dateStr;
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const date = new Date();
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Exportar para uso global
window.NewsManager = {
  initializeNews,
  loadNews,
  saveNews,
  addNews,
  updateNews,
  deleteNews,
  getCategoryName,
  formatNewsDate,
  DEFAULT_NEWS
};

console.log("📰 News Manager carregado!");
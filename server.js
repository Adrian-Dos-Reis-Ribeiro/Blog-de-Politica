const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Configurar o motor de visualização (View Engine) para EJS
app.set('view engine', 'ejs');
// Define a pasta onde estão as views
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos (CSS, JS, Imagens) da pasta 'public'
// Isso permite que o navegador acesse /css/blog.css, por exemplo
app.use(express.static(path.join(__dirname, 'public')));
// Middleware para processar dados de formulário (POST)
app.use(express.urlencoded({ extended: true }));

// Função auxiliar para ler os posts do arquivo JSON
const getPosts = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'posts.json'), 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Erro ao ler posts.json:", err);
        return [];
    }
};

// Função auxiliar para ler as discussões
const getDiscussions = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'discussions.json'), 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Erro ao ler discussions.json:", err);
        return [];
    }
};

// Função auxiliar para salvar discussões
const saveDiscussion = (discussion) => {
    const discussions = getDiscussions();
    discussions.unshift(discussion); // Adicionar no início
    try {
        fs.writeFileSync(path.join(__dirname, 'discussions.json'), JSON.stringify(discussions, null, 2));
    } catch (err) {
        console.error("Erro ao salvar discussions.json:", err);
    }
};

// --- Rotas ---

// Rota: Página Inicial
app.get('/', (req, res) => {
    const posts = getPosts();
    res.render('index', { 
        title: 'Início',
        posts: posts 
    });
});

// Rota: Página Sobre
app.get('/sobre', (req, res) => {
    res.render('sobre', { title: 'Sobre' });
});

// Rota: Página Contato
app.get('/contato', (req, res) => {
    res.render('contato', { title: 'Contato' });
});

// Rota: Página Artigos (Lista Completa)
app.get('/artigos', (req, res) => {
    const posts = getPosts();
    res.render('artigos', { 
        title: 'Artigos',
        posts: posts
    });
});

// Rota: Página de Login
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// Função auxiliar para ler comentários
const getComments = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'comments.json'), 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Erro ao ler comments.json:", err);
        return [];
    }
};

// Função auxiliar para salvar comentários
const saveComment = (comment) => {
    const comments = getComments();
    comments.push(comment);
    try {
        fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 2));
    } catch (err) {
        console.error("Erro ao salvar comments.json:", err);
    }
};

// Rota: Página de Artigo Individual
app.get('/artigo/:id', (req, res) => {
    const posts = getPosts();
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (post) {
        const allComments = getComments();
        // Filter comments for this specific post
        const postComments = allComments.filter(c => c.postId === postId);

        res.render('artigo', { 
            title: post.title,
            post: post,
            comments: postComments
        });
    } else {
        res.status(404).render('404', { title: 'Artigo não encontrado' });
    }
});

// Rota: Postar Comentário em Artigo
app.post('/artigo/:id/comentar', (req, res) => {
    const postId = parseInt(req.params.id);
    const { author, text } = req.body;

    if (author && text) {
        const newComment = {
            id: Date.now(),
            postId: postId,
            author: author,
            text: text,
            date: new Date().toLocaleDateString('pt-BR')
        };
        saveComment(newComment);
    }
    res.redirect(`/artigo/${postId}`);
});

// Rota: Página de Discussão (GET)
app.get('/discussao', (req, res) => {
    const discussions = getDiscussions();
    res.render('discussao', { 
        title: 'Discussão',
        discussions: discussions 
    });
});

// Rota: Página de Discussão (POST)
app.post('/discussao', (req, res) => {
    const { name, opinion } = req.body;
    if (name && opinion) {
        const newDiscussion = {
            id: Date.now(),
            name: name,
            opinion: opinion,
            date: new Date().toLocaleDateString('pt-BR')
        };
        saveDiscussion(newDiscussion);
    }
    res.redirect('/discussao');
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Para parar o servidor, pressione Ctrl + C no terminal.`);
});

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Cargar los artículos desde el archivo JSON
const articlesPath = path.join(__dirname, 'articles.json');

// Endpoint para obtener todos los posts
app.get('/posts', (req, res) => {
  try {
    const data = fs.readFileSync(articlesPath, 'utf8');
    const articlesData = JSON.parse(data);
    res.json(articlesData.posts);
  } catch (error) {
    console.error('Error reading articles:', error);
    res.status(500).json({ error: 'Error loading articles' });
  }
});

// Endpoint para obtener un post específico por ID
app.get('/posts/:id', (req, res) => {
  try {
    const { id } = req.params;
    const data = fs.readFileSync(articlesPath, 'utf8');
    const articlesData = JSON.parse(data);
    const post = articlesData.posts.find(p => p.id === parseInt(id));
    
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    console.error('Error reading article:', error);
    res.status(500).json({ error: 'Error loading article' });
  }
});

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Articles endpoint: http://localhost:${PORT}/posts`);
});

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

const posts = []; // Almacena las publicaciones
let username = ''; // Variable para almacenar el nombre de usuario

// Middleware para body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir contenido estático
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página de inicio
app.get('/', (req, res) => {
    res.render('index');
});

// Ruta para manejar el inicio de sesión
app.post('/login', (req, res) => {
    username = req.body.name; // Guarda el nombre del usuario
    res.redirect('/home');
});

// Ruta para la página principal
app.get('/home', (req, res) => {
    if (!username) {
        return res.redirect('/'); // Redirige si no hay usuario
    }
    res.render('home', { username, posts }); // Renderiza `home` con `posts`
});

// Ruta para manejar la creación de publicaciones
app.post('/create-post', (req, res) => {
    const { title, content } = req.body;
    if (title && content) {
        posts.push({ title, content }); // Agrega la publicación al array `posts`
        res.redirect('/home'); // Redirige a la página principal para ver las publicaciones actualizadas
    } else {
        res.send('Error: Title and content are required.');
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

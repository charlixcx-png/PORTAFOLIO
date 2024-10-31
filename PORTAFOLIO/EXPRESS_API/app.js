const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // para archivos estáticos
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// Variables para almacenar nombres y tareas
let names = [];
let tasks = [];

// GET: root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// GET: /greet
app.get('/greet', (req, res) => {
    const name = req.query.name;
    if (name) {
        names.push(name);
        console.log(`Name received: ${name}`);
        res.redirect('/?name=' + encodeURIComponent(name)); // Redirigir al índice con el nombre
    } else {
        res.status(400).send('Name is required');
    }
});


// GET: /task
app.get('/task', (req, res) => {
    res.json(tasks); // Retorna las tareas en formato JSON
});

// POST: /task
app.post('/task', (req, res) => {
    const newTask = req.body.task;
    if (newTask) {
        tasks.push(newTask);
    }
    res.redirect('/');
});

// DELETE: /task/:id
app.delete('/task/:id', (req, res) => {
    const index = req.params.id;
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
    }
    res.redirect('/');
});

// PUT: /greet/:name
app.put('/greet/:name', (req, res) => {
    const name = req.params.name;
    names.push(name);
    res.json(names);
});

// Handle /greet errors
app.get('/greet/:index', (req, res, next) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < names.length) {
        res.sendFile(path.join(__dirname, 'views', 'wazzup.html'), { name: names[index] });
    } else {
        next(new Error('Index out of range'));
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(404).send('Error: ' + err.message);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3003;

// Middleware para body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

// Ruta POST para calcular el BMI
app.post('/bmi', (req, res) => { // Cambiar a '/bmi'
    const weight = parseFloat(req.body.weight);  // peso en kg
    const height = parseFloat(req.body.height);  // altura en cm

    // Verifica si el peso y la altura son números válidos
    if (isNaN(weight) || isNaN(height) || height <= 0) {
        return res.send('Por favor ingresa valores válidos para el peso y la altura.');
    }

    // Calcula el BMI
    const bmi = (weight / (height * height)) * 10000;

    // Crea el resultado como HTML
    const resultHTML = `
        <h1>Calculadora de BMI</h1>
        <form action="/bmi" method="POST"> <!-- Cambiar a '/bmi' -->
            <label for="weight">Peso (kg):</label>
            <input type="number" id="weight" name="weight" required>
            <br>
            <label for="height">Altura (cm):</label>
            <input type="number" id="height" name="height" required>
            <br>
            <button type="submit">Calcular BMI</button>
        </form>
        <h2>Tu BMI es: ${bmi.toFixed(2)}</h2>
    `;

    // Responde con el resultado
    res.send(resultHTML);
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

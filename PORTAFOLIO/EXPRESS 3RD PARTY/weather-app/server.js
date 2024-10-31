const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/weather', (req, res) => {
    const city = req.body.city;
    const apiKey = '00fb8b05834419a997cb9fc9c6b391c3'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    https.get(url, (response) => {
        let data = '';
        
        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            const weatherData = JSON.parse(data);
            if (weatherData.cod === '404') {
                return res.send('City not found');
            }

            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

        
            res.render('weather', { city, temperature, description, iconUrl });
        });
    }).on('error', (err) => {
        console.error('Error fetching weather data:', err);
        res.send('Error fetching weather data');
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

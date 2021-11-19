const express = require('express');
const https = require('https');

const app = express();

app.use(express.urlencoded({}));

app.get('/', function(req, res) {

    res.sendFile(__dirname + '/index.html');
})

app.post('/', function(req, res){

    const query = req.body.cityName;
    const appid = "e3aab08be8a034c326905cce7ccbb13b";
    const unit = "metric";
    const baseURL = "https://api.openweathermap.org/data/2.5/weather";

    const url = `${baseURL}?q=${query}&appid=${appid}&units=${unit}`;

    https.get(url, function(response){

        response.on('data', function(d){

            const weatherData = JSON.parse(d);
            
            const weatherDescription = weatherData.weather[0].description;
            const weatherTemp = weatherData.main.temp;
            const weatherIcon = weatherData.weather[0].icon;
            const imageURL = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

            res.write(`<p>The weather is currently ${weatherDescription}</p>`);
            res.write(`<h1>The Temperature in ${query} is ${weatherTemp}</h1>`);
            res.write(`<img src=${imageURL}>`);

            res.send();

        });
    });

});

app.listen(3001, function(){
    console.log("Now running on port 3000");
});
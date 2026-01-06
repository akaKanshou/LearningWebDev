import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import https from "https";
import express from "express";
import body from "body-parser";
import { readFile } from "fs";

var appIDWeather;

readFile(__dirname + "/apikeys.txt", (err, data) => {
    if (err) throw err;
    appIDWeather = data.toString("utf-8");
});

const app = express();
app.use(body.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    const postReq = req.body;
    res.write(`<h1>Hello, ${postReq.name}!\n</h1>`);
    res.write(`<h2>Checking weather of ${postReq.city}!\n</h2>`);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${postReq.city}&units=metric&appid=${appIDWeather}`;

    https.get(url, function (callRes) {
        callRes.on("data", (data) => {
            const weatherData = JSON.parse(data);
            res.write(`<h3>Temperature is ${weatherData.main.temp}C\n</h3>`);
            res.write(`<h3>The weather is ${weatherData.weather[0].description}\n</h3>`);

            res.write(`<img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt=${weatherData.weather[0].main}>`);

            res.send();
        })
    })
})

app.listen(29439, (err) => {
    if (err) throw err;
    console.log("Started listening on port 29439");
});
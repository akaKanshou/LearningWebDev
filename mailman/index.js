import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import https from "https";
import express from "express";
import body from "body-parser";
import { readFile } from "fs";

const app = express();
app.use(body.urlencoded({ extended: true }));

app.get("/", (rep, res) => {
    res.sendFile(__dirname + "/signup.html");
})

app.listen(31000, (err) => {
    if (err) throw err;
    console.log("Server started successfully");
})
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import https from "https";
import express from "express";
import body from "body-parser";
import { readFile } from "fs";
import { subscribe } from 'diagnostics_channel';

var apiKey, listID;

readFile(__dirname + "/private/listInfo.txt", (err, data) => {
    if (err) throw err;
    const listInfo = JSON.parse(data);
    apiKey = listInfo.apiKey;
    listID = listInfo.listID;
});

const app = express();
app.use(body.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/signup", (req, res) => {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;

    res.sendFile(__dirname + "/signup.html");

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname,
                    EMAIL: email
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = `https://us5.api.mailchimp.com/3.0/lists/${listID}`;

    const options = {
        method: "POST",
        auth: `akaKanshou:${apiKey}`
    };

    const mailChimpReq = https.request(url, options, (response) => {
    });

    mailChimpReq.write(jsonData);
    mailChimpReq.end();

    res.redirect("/signup");
});

app.listen(31000, (err) => {
    if (err) throw err;
    console.log("Server started successfully");
});
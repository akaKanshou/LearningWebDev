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

const pFunc = new Promise((resolve, reject) => {
    resolve();
});

readFile(__dirname + "/private/listInfo.txt", (err, data) => {
    if (err) throw err;
    const listInfo = JSON.parse(data);
    apiKey = listInfo.apiKey;
    listID = listInfo.listID;
});

function respondToSignupPost(data) {
    const responseData = JSON.parse(data);

    if (responseData.error_count) {
        if (responseData.errors[0].error_code == "ERROR_CONTACT_EXISTS") {
            // console.log("This email is already subscribed!");
            // return ("This email is already subscribed!");
            return "ERROR_CONTACT_EXISTS";
        }

        else if (responseData.errors[0].error_code == "ERROR_GENERIC") {
            // console.log("ERROR_GENERIC");
            // return ("Please enter a real email address! If you think this is a mistake, please contact us.");
            return "ERROR_GENERIC"
        }
    }

    else if (responseData.total_created) {
        // console.log("Successfully Subscribed!");
        // return ("Successfully Subscribed!");
        return "SUCCESS";
    }

    //return ("?Unkown Response?");
    return "ERROR_UNKNOWN";
}

const app = express();
app.use(body.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/signup", (req, res) => {
    req.on("data", (dataBodyString) => {
        const dataBody = JSON.parse(dataBodyString);

        const fname = dataBody.fname;
        const lname = dataBody.lname;
        const email = dataBody.email;

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
            response.on("data", (data) => {
                pFunc
                    .then(() => respondToSignupPost(data))
                    .then((resultstr) => res.send(resultstr));
                //.then((resultStr) => res.send({ 'resultString': resultStr }));

                // console.log(JSON.parse(data));
            });
        });


        mailChimpReq.write(jsonData);
        mailChimpReq.end();
    })
});

app.listen(31000, (err) => {
    if (err) throw err;
    console.log("Server started successfully");
});
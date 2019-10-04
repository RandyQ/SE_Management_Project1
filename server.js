'use strict';
let express = require('express');
let app = express();
const fs = require('fs');

app.get('/', function(req, res) {
        res.send("this is the home page\n");
});

app.get('/version', function (req, res) {
        if (res) {
                logFunctionCall('/version');
        } else {
                resultFailed('/version');
        }

        res.type('text/plain');
        res.send('This is version 0 of the HotBurger service\n');
});

app.get('/logs', function(req, res) {
        res.type('text/plain');
        // If a result was successfully sent
        if (res) {
               logFunctionCall('/logs');
        } else {
               resultFailed('/logs');
        }

        fs.readFile("./logs/logfile.txt", function(err, buf) {
                res.send(buf.toString());
        });
});

function logFunctionCall(route) {
        fs.appendFile('./logs/logfile.txt', route + " route was called.  The result was succesfully sent.\n", "utf8", (err) => {
                if (err) {
                        throw new Err('Failure to append to file in ' + route + ' route \n');
                }
        });
}

function resultFailed(route) {
        fs.appendFile('./logs/logfile.txt', route + " route was called.  The result FAILED to send.\n", "utf8", (err) => {
                if (err) {
                        throw new Err('Failure to append to file in ' + route + ' route \n');
                }
        });
}

app.use(function(err, req, res, next) {
        fs.appendFile('./logs/logfile.txt', err.message, "utf8");
        res.type('text/plain');
        res.status(500).send("An error has occurred.");
});

app.listen(3000, () => {
        console.log('App listening on port 3000!');
});

let express = require('express');
let app = express();
const fs = require('fs');

app.get('/', function(req, res) {
        res.send("this is the home page\n");
});

app.get('/version', async function (req, res, next) {
        if (res) {
                logFunctionCall('/version', next);
        } else {
                resultFailed('/version', next);
        }

        res.type('text/plain');
        res.send('This is version 0 of the HotBurger service\n');
});

app.get('/logs', function(req, res, next) {
        res.type('text/plain');
        // If a result was successfully sent
        if (res) {
               logFunctionCall('/logs', next);
        } else {
               resultFailed('/logs', next);
        }

        fs.readFile("./logs/logfile.txt", function(err, buf) {
                if (err) {
                        res.send("Failed to read file when calling the /logs route");
                } else {
                        res.send(buf.toString());
                }                
        });
});

function logFunctionCall(route, next) {
        fs.appendFile('./logs/logfile.txt', route + " route was called.  The result was succesfully sent.\n", "utf8", (err) => {
                if (err) {
                        next(err.message);
                }
        });
}

function resultFailed(route, next) {
        fs.appendFile('./logs/logfile.txt', route + " route was called.  The result FAILED to send.\n", "utf8", (err) => {
                if (err) {
                        next(err.message);
                }
        });
}

module.exports = app;
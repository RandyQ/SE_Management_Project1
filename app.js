let express = require('express');
let app = express();
const fs = require('fs');

app.get('/', function(req, res) {
        res.send("This is the home page\n");
});

app.get('/version', function (req, res) {
        // If a result was successfully sent
        res ? logFunctionCall('/version') : resultFailed('/version');
        res.send('This is version 0 of the HotBurger service\n');
});

app.get('/logs', async function(req, res) {
        // If a result was successfully sent, write to the log (await) before reading from it
        res ? await logFunctionCall('/logs') : resultFailed('/logs');
        fs.readFile("./logs/logfile.txt", function(err, buf) {
                err ? res.send("Failed to read file when calling the /logs route") : res.send(buf.toString());
        });
});

function logFunctionCall(route) {
        return new Promise((resolve) => {
                fs.appendFile('./logs/logfile.txt', `${route} route was called.  The result was succesfully sent.\n`, "utf8", (err) => {
                        if (err) {
                                console.log(`ERROR: Log failed to write to file when calling the ${route} route`);
                        }

                        resolve();
                });
        });
}

function resultFailed(route) {
        fs.appendFile('./logs/logfile.txt', `${route} route was called.  The result FAILED to send.\n`, "utf8", (err) => {
                if (err) {
                        console.log(`ERROR: Log failed to write to file when calling the ${route} route`);
                }
        });
}

app.use(function(req, res, next) {
        res.status(404);
        res.send('404 – Not Found');
});

module.exports = app;
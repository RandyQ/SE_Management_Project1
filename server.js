'use strict';
let express = require('express');
let app = express();
const fs = require('fs');

app.get('/', function(req, res) {
        res.send("this is the home page\n");
});

app.get('/version', function(req, res){
        if (res) {
                fs.appendFile('./logs/logfile.txt', "/version route was called.  The result was succesfully sent.\n", "utf8", (err) => {
                        if (err) {
                                throw new Err('Failure to append to file in /version route \n');
                        }
                });
                
                res.type('text/plain');
                res.send('This is version 0 of the HotBurger service\n');
        }
});

app.get('/logs', function(req, res) {
        res.type('text/plain');
        // If a result was successfully sent
        if (res) {
                fs.appendFile('./logs/logfile.txt', "/logs route was called.  The result was succesfully sent.\n", "utf8", (err) => {
                        if (err) {
                                throw new Err('Failure to append to file in /logs route \n');
                        }
                });
        }

        fs.readFile("./logs/logfile.txt", function(err, buf) {
                res.send(buf.toString());
                if (err) { 
                        console.log(err); 
                }
        });
});

app.use(function(err, req, res, next) {
        fs.appendFile('./logs/logfile.txt', err.message, "utf8");
        res.type('text/plain');
        res.status(500).send("An error has occurred.");
});

app.listen(80, () => {
        console.log('App listening on port 80!');
});

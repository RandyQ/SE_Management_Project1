'use strict';
let express = require('express');
let app = express();
const fs = require('fs');

app.get('/', function(req, res) {
        res.send("this is the home page");
});

app.get('/version', function(req, res){
        res.type('text/plain');
        res.send('This is version 0 of the HotBurger service');
});

app.get('/logs', function(req, res) {
        res.type('text/plain');
        fs.appendFile('./logs/logfile.txt', "hey hey hey", "utf8", (err) => {
                if (err) { 
                        throw err; 
                }
                
                console.log('text written to file!');
        });

        fs.readFile("./logs/logfile.txt", function(err, buf) {
                res.send(buf.toString());
                if (err) { 
                        console.log(err); 
                }
        });
});

app.use(function(err, req, res, next) {
        console.error(err.message);
        res.type('text/plain');
        res.status(500).send("An error has occurred");
});

app.listen(80, () => {
        console.log('Example app listening on port 80!');
});

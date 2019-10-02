'use strict';
let express = require('express');
let app = express();

app.get('/', function(req, res) {
        res.send("this is the home page");
});

app.get('/version', function(req, res){
        res.type('text/plain');
        res.send('This is version 0 of the HotBurger service');
});

app.listen(3000, () => {
        console.log('Example app listening on port 3000!');
});

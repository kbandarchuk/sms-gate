var express = require('express');
var router = require('./lib/controllers/message-controller');

const app = express();
const port = 8080;

app.use('/', router.rout);
app.listen(port, function(){
    console.log(`Server running on ${port} port`);
});


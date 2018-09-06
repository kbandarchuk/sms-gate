var express = require('express');
var router = require('./lib/controllers/message-controller');
var PropertiesReader = require('properties-reader');

const properties = PropertiesReader('./resources/application.properties');
const app = express();
const port = properties.get("server.port");

app.use('/', router.rout);
app.listen(port, function(){
    console.log(`Server running on ${port} port`);
});


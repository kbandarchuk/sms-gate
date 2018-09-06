import express from 'express';
import router from './lib/controllers/message-controller';
import PropertiesReader from 'properties-reader';

const properties = PropertiesReader('./resources/application.properties');
const app = express();
const port = properties.get("server.port");

app.use('/', router.rout);
app.listen(port, function(){
    console.log(`Server running on ${port} port`);
});
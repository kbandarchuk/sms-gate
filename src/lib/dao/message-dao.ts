import pg from 'pg';
import Message from '../domains/message';
import PropertiesReader from 'properties-reader';

const queryForFetchMessages = 'SELECT * FROM message';
const queryForSaveMessage = 'INSERT INTO message(phone, text_message) VALUES($1, $2)';
const properties = PropertiesReader('./resources/application.properties');
const connectionParams = {
    user : properties.get('database.user'),
    password : properties.get('database.password'),
    host : properties.get('database.host'),
    database : properties.get('database.name'),
    port : properties.get('database.port')
};
const pool = new pg.Pool(connectionParams);

const fetchAllMessages = function(callback){
    const messages = [];
    pool.connect(function(err, client, done) {
        client.query(queryForFetchMessages, function(err, res) {
            done();
            if(err){
                console.log(err.stack);
            } else{
                res.rows
                   .map(row => new Message(row.phone, row.text_message))
                   .forEach(message => messages.push(message));
                callback(messages);
            }
        });
    });
};

const saveMessage = function (phone, textMessage) {
    const values = [phone, textMessage];
    pool.connect(function(err, client, done){
        client.query(queryForSaveMessage, values, function (err) {
            done();
            if(err) {
                console.log(err.stack);
            }
        })
    })
};

export default {
    fetchAllMessages : fetchAllMessages,
    saveMessage : saveMessage
};

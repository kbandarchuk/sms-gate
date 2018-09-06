var pg = require("pg");
var Message = require("../domains/message").Message;

const queryForFetchMessages = 'SELECT * FROM message';
const queryForSaveMessage = 'INSERT INTO message(phone, text_message) VALUES($1, $2)';
const connectionParams = {
    user: 'kbandarchyk',
    host: 'localhost',
    database: 'sms_gate',
    password: '123a456B',
    port: 5432,
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

module.exports = {
    fetchAllMessages : fetchAllMessages,
    saveMessage : saveMessage
};
import messageDao from '../dao/message-dao';

const fetchAllMessages = function(callback){
    messageDao.fetchAllMessages(function(result){
        callback(result);
    });
};

const saveMessage = function (message) {
    messageDao.saveMessage(message.phone, message.textMessage);
};

export default {
    fetchAllMessages : fetchAllMessages,
    saveMessage : saveMessage
};
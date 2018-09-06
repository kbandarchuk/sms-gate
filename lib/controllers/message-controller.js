var express = require("express");
var Message = require('../domains/message').Message;
var messageService = require('../service/message-service');
var bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.get("/fetch", function (req,res) {
    messageService.fetchAllMessages(function(result) {
        res.send(result);
    })
});

router.post("/save", function (req,res) {
    messageService.saveMessage(new Message(req.body.phone, req.body.message));
    res.send("End of operation");
});

module.exports = {
    rout: router
};
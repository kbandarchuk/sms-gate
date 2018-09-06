var express = require("express");
var Message = require('../domains/message').Message;
var messageService = require('../service/message-service');
var bodyParser = require('body-parser');

const router = express.Router();
const error_handler = function (err, req, res, next) {
    console.log(err);
    if(err.type === 'entity.parse.failed'){
        res.status(400).send("Entity Parse Failed. Check the structure of the sent data ");
    } else{
        res.status(500).send("Unexpected error");
    }
};

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
router.use(error_handler);


router.get("/fetch", function (req,res) {
    messageService.fetchAllMessages(function(result) {
        res.send(result);
    })
});

router.post("/save", function (req,res) {
    messageService.saveMessage(new Message(req.body.phone, req.body.message));
    res.status(200).send("Successfully completed");
});

module.exports = {
    rout: router
};


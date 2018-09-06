class Message {

    constructor(phone, textMessage){
        this.phone = phone;
        this.textMessage = textMessage;
        this.validateObject();
        Object.freeze(this);
    }

    validateObject(){
        this.validatePhoneInvariants();
        this.validateTextMessageInvariants();
    }

    validatePhoneInvariants(){
        if(Message.isEmpty(this.phone)){
            throw new Error("Phone cant be empty");
        }
    }

    validateTextMessageInvariants(){
        if(Message.isEmpty(this.textMessage)){
            throw new Error("TextMessage cant be empty");
        }
    }

    static isEmpty(str){
        return (typeof str === "undefined" || str === null || str.trim() ===  "");
    }
}

module.exports = {
    Message : Message
};
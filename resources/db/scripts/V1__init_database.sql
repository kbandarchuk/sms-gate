-- CREATE TABLE
CREATE TABLE message(id INT NOT NULL PRIMARY KEY, phone VARCHAR(25) NOT NULL, text_message VARCHAR(255) NOT NULL);

-- CREATE SEQ
CREATE SEQUENCE message_id_seq;
ALTER TABLE message ALTER COLUMN id SET DEFAULT nextval('message_id_seq');

-- CREATE TEST DATA
INSERT INTO message(phone, text_message) VALUES('375255289490', 'Hello! Whatsup?');
const amqplib = require("amqplib");


async function communicationConnection() {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();
    return channel;
}

module.exports = {
    communicationConnection
}
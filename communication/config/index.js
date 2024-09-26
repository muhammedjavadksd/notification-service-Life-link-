const amqplib = require("amqplib");


async function communicationConnection() {
    const connection = await amqplib.connect(process.env.RABBITMQ_URL || "");
    const channel = await connection.createChannel();
    return channel;
}

module.exports = {
    communicationConnection
}
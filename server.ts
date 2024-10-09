import express from 'express'
import dotenv from 'dotenv'
const app = express();

dotenv.config({ path: "./.env" });

const consumeRabbitMQ = require("./helper/consumeMessage");
const PORT: number = +(process.env.PORT || 7003)

consumeRabbitMQ().then(() => {
    app.listen(PORT, () => {
        console.log("Notification Service started at Port : " + PORT);
    });
}).catch((error: Error) => {
    console.error("Error starting Notification Service:", error);
});



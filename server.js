
//Imports
const express = require("express");
const app = express();
const dotenv = require("dotenv");


//Config
dotenv.config("./.env");

const consumeRabbitMQ = require("./helper/consumeMessage");



//const
const PORT = process.env.PORT || 7003

consumeRabbitMQ().then(() => {
    app.listen(PORT, () => {
        console.log("Notification Service started at Port : " + PORT);
    });
}).catch((error) => {
    console.error("Error starting Notification Service:", error);
});


// app.listen(PORT, () => {
//     console.log("Notification Service started at Port : " + PORT)
// })
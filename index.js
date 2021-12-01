const express = require("express");



// const transporter = require("./config/mail")
    // console.log('transporter:', transporter.sendMail)
const userController = require("./controlers/user.controler")


const app = express();

app.use(express.json());

app.use("/users", userController)

module.exports = app;


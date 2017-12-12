const path = require("path");
const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const {generateMessage} = require("./utils/message");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.emit("welcomeMessage", generateMessage("Admin", "Welcome to the chat app!"))

    socket.broadcast.emit("welcomeMessage", generateMessage("NewUser", "New user joins!"))

    socket.on("createMessage", (message) => {
        console.log("createMessage", message);
        io.emit("newMessage", generateMessage(message.from, message.text))
    })

    socket.on("disconnect", () => {
        console.log("User was disconnected.")
    })
})

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app}

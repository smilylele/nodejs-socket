const path = require("path");
const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation")
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");



    socket.on("join", (param, callback) => {
        if (!isRealString(param.name) || !isRealString(param.room)) {
            callback("The room and name are required!")
        }

        socket.join(param.room);
        socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app!"))
        socket.broadcast.to(param.room).emit("newMessage", generateMessage(param.name, `${param.name} Joins`))
        callback()
    })

    socket.on("createMessage", (message, callback) => {
        console.log("createMessage", message);
        io.emit("newMessage", generateMessage(message.from, message.text))
        callback()
    })

    socket.on("createLocationMessage", (coords) => {
        io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude))
    })

    socket.on("disconnect", () => {
        console.log("User was disconnected.")
    })
})

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app}

const path = require("path");
const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");

    socket.emit("newMessage", {
        from : "Spoonmanchen",
        text : "This is the first message sent",
        createdAt : 20171211
    })

    socket.on("CreateMessage", (newMessage) => {
        console.log("createdMessage" , newMessage)
    })

    socket.on("disconnect", () => {
        console.log("User was disconnected.")
    })
})

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app}

const path = require("path");
const publicPath = path.join(__dirname, "/../public");
const port = process.env.PORT || 3000;
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation")
const {Users} = require("./utils/users");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on("connection", (socket) => {
    console.log("New user connected");



    socket.on("join", (param, callback) => {
        if (!isRealString(param.name) || !isRealString(param.room)) {
            callback("The room and name are required!")
        }

        socket.join(param.room);
        users.removeUser(socket.id)
        users.addUser(socket.id, param.name, param.room);

        io.to(param.room).emit("updateUserlist", users.getUserList(param.room));
        socket.emit("newMessage", generateMessage("Admin", "Welcome to the chat app!"));
        socket.broadcast.to(param.room).emit("newMessage", generateMessage("Admin", `${param.name} Joins`))
        callback()
    })

    socket.on("createMessage", (message, callback) => {
        var user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit("newMessage", generateMessage(user.name, message.text))
        }

        callback() // empty the messagebox
    })

    socket.on("createLocationMessage", (coords) => {
        var user = users.getUser(socket.id);

        if(user){
            io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coords.latitude, coords.longitude))
        }

    })

    socket.on("disconnect", () => {
        var leavingUser = users.removeUser(socket.id);

        if (leavingUser) {
            io.to(leavingUser.room).emit("updateUserlist", users.getUserList(leavingUser.room));
            io.to(leavingUser.room).emit("newMessage", generateMessage("Admin", `${leavingUser.name} has left.`))
        }
    })
})

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app}

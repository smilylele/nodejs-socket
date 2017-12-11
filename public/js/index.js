var socket = io();

socket.on("connect", function () {
    console.log("Connected to server");

    socket.emit("CreateMessage", {
        to: "Spoonmanchen",
        text : "Message sent back"
    })

})

socket.on("disconnect", function () {
    console.log("Disconnect from the server!");
})

socket.on("newMessage", function (message) {
    console.log("New message!", message)
})

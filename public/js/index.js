var socket = io();

socket.on("connect", function () {
    console.log("Connected to server");
})

socket.on("newMessage", function(message) {
    console.log(message.text)
})

socket.on("disconnect", function () {
    console.log("Disconnect from the server!");
})

socket.on("newMessage", function (message) {
    console.log("New message!", message)
    var li = jQuery("<li></li>");
    li.text(`${message.from} : ${message.text}`);

    jQuery("#messages").append(li);

})

// socket.emit("createMessage", {
//     from : "Chen",
//     text : "Hi!"
// }, function () {
//     console.log("Got it")
// })

jQuery("#message-form").on("submit", function(e) {
    e.preventDefault();
    socket.emit("createMessage", {
        from : "User",
        text : jQuery("[name=message]").val()
    }, function() {

    });
});

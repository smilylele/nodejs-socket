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
    var momentMessage = moment(message.createdAt).format("h:mm:ss a")
    var template = jQuery("#message-template").html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        timestamp : momentMessage
    });

    jQuery("#messages").append(html);
    // // console.log("New message!", message)


    // var li = jQuery("<li></li>");
    // li.text(`${message.from} ${momentMessage}: ${message.text}`);

    // jQuery("#messages").append(li);

})

socket.on("newLocationMessage", function (message) {
    var momentMessage = moment(message.createdAt).format("h:mm:ss a")
    var template = jQuery("#location-template").html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        timestamp : momentMessage
    });

    jQuery("#messages").append(html);
})

var messageTextbox = jQuery("[name=message]");

jQuery("#message-form").on("submit", function(e) {
    e.preventDefault();
    socket.emit("createMessage", {
        from : "User",
        text : messageTextbox.val()
    }, function() {
       messageTextbox.val("")
    });
});

var locationButton = jQuery("#send-location");
locationButton.on("click", function() {
    if (!navigator.geolocation) {
        return alert("Geolocation not supported by your browser")
    }

    locationButton.attr("disabled", "disabled").text("Sending Location ...");

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr("disabled").text("Send Location");

        socket.emit("createLocationMessage", {
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        });
    }, function() {
        locationButton.removeAttr("disabled").text("Send Location");
        alert("Unable to fetch location.");
    })
})

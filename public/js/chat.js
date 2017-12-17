var socket = io();

function scrollToBottom () {
    var messages = jQuery("#messages");
    var newMessage = messages.children("li:last-child")
    // Height
    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollHeight + newMessageHeight + lastMessageHeight >= scrollHeight) {
        console.log("Should Scroll")
        messages.scrollTop(scrollHeight);
    }
}

socket.on("connect", function () {
    // console.log("Connected to server");
    var params = jQuery.deparam(window.location.search);
    socket.emit("join", params, function (err) {
        if (err) {
            alert(err)
            window.location.href = "/"
        } else {
            console.log("No error")
        }
    })
})

socket.on("newMessage", function(message) {
    console.log(message.text)
})

socket.on("disconnect", function () {
    console.log("Disconnect from the server!");
})

socket.on("updateUserlist", function (users) {

    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
      ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
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
    scrollToBottom();

})

socket.on("newLocationMessage", function (message) {
    var momentMessage = moment(message.createdAt).format("h:mm:ss a")
    var template = jQuery("#location-template").html();
    var html = Mustache.render(template, {
        location: message.url,
        from: message.from,
        timestamp : momentMessage
    });
    console.log(message.url)
    console.log(momentMessage)
    jQuery("#messages").append(html);
    scrollToBottom();
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

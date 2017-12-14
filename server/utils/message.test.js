var expect = require("expect");

var {generateMessage, generateLocationMessage} = require("./message");
var message_example = {
    from : "Chenfmmu@163.com",
    text : "Lele is a good dog!"
}

describe("generateMessage", () => {
    it("should generate correct message object", () => {
        returnedMessage = generateMessage(message_example.from, message_example.text)

        expect(returnedMessage.from).toBe(message_example.from)
        expect(returnedMessage.text).toBe(message_example.text)
        expect(typeof returnedMessage.createdAt).toBe("number")
    })
})

describe("generateLocationMessage", () => {
    it("should generate correct location message", () => {
        returnedMessage = generateLocationMessage("Chen", 1, 1);
        expect(returnedMessage.from).toBe("Chen");
        expect(returnedMessage.url).toBe("https://www.google.com/maps?q=1,1");
        expect(typeof returnedMessage.createdAt).toBe("number")
    })
})

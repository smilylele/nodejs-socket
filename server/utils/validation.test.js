const expect = require("expect");
const {isRealString} = require("./validation.js")

describe("isRealString test", () => {
    it("should reject the empty string ", () => {
        expect(isRealString("")).toBeFalsy();
        expect(isRealString("    ")).toBeFalsy();
        expect(isRealString("Lelel dfjkd")).toBeTruthy();
    })
})

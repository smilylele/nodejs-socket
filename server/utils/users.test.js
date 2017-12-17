const {Users} = require("./users.js");
const expect = require("expect");

describe("Users", () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "3943",
            name : "Mike",
            room : "Node Chat"
        }, {
            id : "3jfdjfeiru",
            name : "Chen",
            room : "JustChat"
        }, {
            id : "dfdfds",
            name : "39f",
            room : "JustChat"
        }]
    })

    it("should give a user list", () => {
        var namelist = users.getUserList("JustChat");
        expect(namelist).toEqual(["Chen", "39f"])
    })


    it("should give a user list", () => {
        var namelist = users.getUserList("Node Chat");
        expect(namelist).toEqual(["Mike"])
    })

    it("should get a specific user", () => {
        var pickedUser = users.getUser("3943");
        expect(pickedUser).toEqual(["Mike"]);
    })

    it("should remove a specifc user by id", () => {
        var pickedList = users.removeUser("3jfdjfeiru");
        expect(pickedList).not.toContain("Chen");
        expect(pickedList).toContain("Mike")
    })

    it("should add a user", () => {
        var users = new Users()
        var user = {
            id : "93ufjd",
            name : "chen",
            room : "Chat"
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user])
    })
})

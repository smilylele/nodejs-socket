//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(roomName)

class Users {
    constructor () {
        this.users = []
    }

    addUser (id, name, room) {
        var user = {id, name, room}
        this.users.push(user)
        return user
    }

    removeUser (id) {
        var poppedUser = this.users.filter((user) => {
            return user.id === id
        })[0]

        this.users = this.users.filter((user) => {
            return user.id !== id;
        })

        return poppedUser
    }

    getUser (id) {
        var users = this.users.filter((user) => {
            return user.id === id;
        })
        return users[0]
    }


    getUserList (room) {
    var users = this.users.filter((user) => user.room === room);
    var namesArray = users.map((user) => user.name);

    return namesArray;

    }
}

module.exports = {Users}

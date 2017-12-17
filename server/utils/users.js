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
        var users = this.users.filter((user) => {
            return user.id !== id;
        })

        var namelist = users.map((user) => {
            return user.name
        })

        return namelist
    }

    getUser (id) {
        var users = this.users.filter((user) => {
            return user.id === id;
        })

        var namelist = users.map((user) => {
            return user.name
    })
        return namelist
    }

    getUserList (room) {
        var users = this.users.filter((user) => {
            return user.room === room;
        });

        var namelist = users.map((user) => {
            return user.name
        })

        return namelist

    }
}

module.exports = {Users}

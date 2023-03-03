const db = require('../config/db.js');

const subscribe = (user) => {
    console.log(user);
    return db('users')
    .insert(user)
    .returning("username")
}

const getUserByName = (user)  => {
    return db("users")
    .select("*")
    .where({username : user.username})
}

const getAllUsernames = () => {
    return db("users")
    .select("username")
}

module.exports = {
    subscribe,
    getUserByName,
    getAllUsernames
}
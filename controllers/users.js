const {subscribe, getUserByName} = require('../modules/users.js');


const _subscribe = async (req, res) => {
    const user_in_database = await getUserByName(req.body);
    if (user_in_database.length === 0) {
        subscribe(req.body)
        .then (data => {
        res.json(data[0])
        })
        .catch ((err) => {
            console.log(err);
            res.status(500).json({msg : "failed to add user"})
        })
    } else {
        res.json({msg : `Sorry, user ${req.body.username} already exists`})
    }
    
}

const _login = async (req, res) => {
    const user_from_database = await getUserByName(req.body)
    if (user_from_database.length === 0) {
        res.json({msg : "user doesn't exist"})
    } else if (user_from_database[0].password != req.body.password) {
        res.json({msg : "invalid password"})
    } else {
        res.json({msg : `Wellcome ${user_from_database[0].first_name}`})
    }
}

module.exports = {_subscribe, _login}
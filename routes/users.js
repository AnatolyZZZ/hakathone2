const {_subscribe, _login, _getAllUsernames} = require('../controllers/users.js');

const express = require('express');

const router = express.Router();

router.post("/subscr", _subscribe);

router.post("/log", _login);

router.get('/', _getAllUsernames);

module.exports = router;
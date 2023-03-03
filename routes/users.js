const {_subscribe, _login} = require('../controllers/users.js');

const express = require('express');

const router = express.Router();

router.post("/subscr", _subscribe);

router.post("/log", _login);

module.exports = router;
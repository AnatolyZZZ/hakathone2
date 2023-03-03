const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const user_router = require ('./routes/users.js');
const { urlencoded } = require('express');

dotenv.config();

const app = express();

app.use(cors());
app.use(urlencoded({extended: true}))
app.use(express.json());

app.use("/", express.static(__dirname + "/public"));

app.listen(process.env.PORT, () => {
    console.log(`running ${process.env.PORT}`)
})

app.use("/users", user_router);
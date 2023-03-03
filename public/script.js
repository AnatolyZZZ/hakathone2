const login_btn = document.getElementById("switch_login");
const subscribe_btn = document.getElementById("switch_subscribe");
const loginform = document.getElementById("login");
const registerform = document.getElementById("register");
const result = document.getElementById("result");
const pass_match = document.getElementById('pass_match');
const password = document.getElementById("password");
const passconfirm = document.getElementById("passconfirm");
const towforms = document.getElementById("twoforms");
const invalidFirstName = document.getElementById("invalid_firstname");
const invalidLastName = document.getElementById("invalid_lastname");
const invalidUsername = document.getElementById("invalid_username");
const nameinput = document.getElementById("first_name");
const userNameInput = document.getElementById("username");
const left = document.getElementById("left");
const right = document.getElementById("right");


const makeLoginVisible = () => {
    registerform.classList.add('invisible');
    loginform.classList.remove('invisible');
    subscribe_btn.classList.add('faded');
    right.classList.add('faded2');
    left.classList.remove('faded2');
    login_btn.classList.remove('faded');
}
const makeSubscribeVisible = () => {
    registerform.classList.remove('invisible');
    loginform.classList.add('invisible');
    subscribe_btn.classList.remove('faded');
    left.classList.add('faded2');
    right.classList.remove('faded2');
    login_btn.classList.add('faded');
}

const makeResultInvisible = () => {
    result.classList.add('invisible');
}
nameinput.addEventListener('click', () => invalidFirstName.classList.add("invisible"));

result.addEventListener("click", makeResultInvisible);

login_btn.addEventListener("click", makeLoginVisible);
subscribe_btn.addEventListener("click", makeSubscribeVisible);

loginform.addEventListener("submit", login);
registerform.addEventListener("submit", register);

passconfirm.addEventListener("click", removePassMatch);
password.addEventListener("click", removePassMatch);

userNameInput.addEventListener("input", checkUsername);

function removePassMatch () {
    pass_match.classList.add('invisible');
}

async function login (e) {
    e.preventDefault();
    const userdata = Object.fromEntries(new FormData(loginform));
    const req = {
        method : "POST",
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify(userdata)
    }
    try {
        const resp = await fetch("/users/log", req);
        const resp_data = await resp.json();
        result.innerHTML=`<p>${resp_data.msg}</p>`
        result.classList.remove('invisible');
    } catch (err){
        console.log(err)
    }
    
}
let userList = [];

getAllUsers()
.then(
    data => userList=data
)
.catch( 
    (err) => {console.log(err);}
)

async function checkUsername (e) {
    const name = e.target.value;
    // const userList = await getAllUsers();
    // console.log(userList);
    const ind = userList.findIndex(elt => elt.username === name);
    if (ind != -1) {
        invalidUsername.classList.remove('invisible');
        invalidUsername.innerHTML = `Sorry, ${name} is occupied`
    } else {
        invalidUsername.classList.add('invisible');
    }
}

function checkPassword(userdata) {
    if (userdata.password != userdata.passconfirm) {
        pass_match.classList.remove('invisible');
        pass_match.innerHTML = "Password confirmation doesn't match"
    } else return true
}

function checkName(userdata) {
    if (userdata.first_name === "") {
        invalidFirstName.classList.remove('invisible');
        invalidFirstName.innerHTML = "Please provide first name!"
    } else return true
}

async function register (e) {
    e.preventDefault();
    const userdata = Object.fromEntries(new FormData(registerform));
    if(checkPassword(userdata) & checkName(userdata)) {
        delete userdata.passconfirm;
        const req = {
            method : "POST",
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify(userdata)
        }
        try {
            const resp = await fetch("/users/subscr", req);
            const resp_data = await resp.json();
            console.log(resp_data);
            if (resp_data.username) {
                result.innerHTML=`<p>User ${resp_data.username} has been succsesfully subscribed</p>`
                result.classList.remove('invisible');
            }
            if (resp_data.msg) {
                result.innerHTML=`<p>${resp_data.msg}</p>`
                result.classList.remove('invisible');
            }
            
        } catch (err){
            console.log(err)
        }
    
    }
}

async function getAllUsers () {
    const resp = await fetch("/users");
    const users = await resp.json();
    return users
}
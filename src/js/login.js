// logga in

let url = "https://pizzaapi-kzs1.onrender.com/api/login" //URL till mitt API

/* funktion för att läsa in datan i formuläret */
const loginBtnEl = document.getElementById("loginBtn");
loginBtnEl.addEventListener('click', (e) => {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let error = document.getElementById("error");

    if (username == "" || password == "") {
        //throw error
        error.innerHTML = "You must fill in everything!";
        return;
    } else {
        loginUser(username, password);
    }
});

/* Funktion för att logga in */
async function loginUser(username, password) {
    let user = {
        username: username,
        password: password,

    }
    let success = document.getElementById("success");
    let error = document.getElementById("error");
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify(user)
    });

    const data = await response.json();
    console.log(data);

    if (data.error) {
        error.innerHTML = `${data.error}`
    } else {
        localStorage.setItem('token', data.response.token); //spara JWT token
        localStorage.setItem('username', user.username);
        success.innerHTML = `${data.response.message}`;
        error.innerHTML = "";
        setTimeout(logInRedirect, 1000)
        function logInRedirect() { window.location.href = 'admin.html' };  //skicka en till sidan bara tillåten för inloggade
    }
}
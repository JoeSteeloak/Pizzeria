// logga ut-knapp
const logOutBtnEl = document.getElementById("logoutbtn");
logOutBtnEl.addEventListener("click", logout);
function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.href = 'index.html';
}


const url = "http://127.0.0.1:3000/menu" //URL till mitt API


/* funktion för att läsa in datan i formuläret */
const registerBtnEl = document.getElementById("registerBtn");
registerBtnEl.addEventListener('click', (e) => {
    e.preventDefault();

    let foodname = document.getElementById("foodname").value;
    let price = document.getElementById("price").value;
    let ingredients = document.getElementById("ingredients").value;

    createFoodItem(foodname, price, ingredients);
});

/* Funktion för att lägga till data i databasen */
async function createFoodItem(foodname, price, ingredients) {
    let foodItem = {
        foodname: foodname,
        price: price,
        ingredients: ingredients
    }
    let status = document.getElementById("status");
    const token = localStorage.getItem('token');

    const response = await fetch(url + "/register", {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token,
            "Content-Type": "Application/json"            
        },
        body: JSON.stringify(foodItem)
    });

    const data = await response.json();
    console.log(data);
    if (data.error) {
        status.innerHTML = `${data.error}`;
    } else {
        status.innerHTML = `${data.message}`;
    }
}
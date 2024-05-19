// logga ut-knapp
const logOutBtnEl = document.getElementById("logoutbtn");
logOutBtnEl.addEventListener("click", logout);
function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.href = 'index.html';
}


const url = "https://pizzaapi-kzs1.onrender.com/menu" //URL till mitt API
const registerFormEl = document.getElementById('registerForm');
const updateFormEl = document.getElementById('updateForm');


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
        setTimeout(function () { location.reload() }, 2000);
    }
}

/* Hämta all mat på menyn och lägg den i dropdownmenyn */
window.onload = init;
async function init() {
    const optionsEl = document.getElementById("options");

    const response = await fetch(url + "/getmenu");
    const data = await response.json();
    data.forEach(e => {
        const option = document.createElement("option");
        option.setAttribute("value", `${e.foodname}`);
        option.innerHTML = `${e.foodname}`;
        optionsEl.appendChild(option);
    });
    optionsEl.addEventListener('change', (event) => { //eventlistener när man väljer i rullgardinen
        const selectedFoodname = event.target.value;

        if (selectedFoodname === 'create') {
            registerFormEl.classList.remove('hidden');
            updateFormEl.classList.add('hidden');
        } else {
            updateFormEl.classList.remove('hidden');
            registerFormEl.classList.add('hidden');
            editFood(selectedFoodname);
        }
    });
};

async function editFood(foodname) {
    console.log(foodname);

    const response = await fetch(url + "/getmenu/" + foodname);
    const data = await response.json();
    const nameEl = document.getElementById("updatedFoodname");
    const priceEl = document.getElementById("updatedPrice");
    const ingredientsEl = document.getElementById("updatedIngredients");

    //Läs ut datan som ska uppdateras
    nameEl.setAttribute("value", `${foodname}`);
    priceEl.setAttribute("value", `${data.price}`);
    ingredientsEl.setAttribute("value", `${data.ingredients}`);
};

//uppdatera-knappen
const updateBtnEl = document.getElementById("updateBtn");
updateBtnEl.addEventListener("click", updateFood);

//delete-knappen
const deleteBtnEl = document.getElementById("deleteBtn");
deleteBtnEl.addEventListener("click", deleteFood);

//update-funktion
async function updateFood() {

    const nameEl = document.getElementById("updatedFoodname");
    const priceEl = document.getElementById("updatedPrice");
    const ingredientsEl = document.getElementById("updatedIngredients");

    let foodItem = {
        foodname: nameEl.value,
        price: priceEl.value,
        ingredients: ingredientsEl.value
    }
    let status = document.getElementById("updateStatus");
    const token = localStorage.getItem('token');

    const response = await fetch(url + "/updatemenu/" + nameEl.value, {
        method: "PUT",
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
        setTimeout(function () { location.reload() }, 2000);
    }
};

//delete-function
async function deleteFood() {

    const nameEl = document.getElementById("updatedFoodname");
    let foodItem = {
        foodname: nameEl.value,
    };
    let status = document.getElementById("updateStatus");
    const token = localStorage.getItem('token');

    const response = await fetch(url + "/deletemenu/" + nameEl.value, {
        method: "DELETE",
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
        setTimeout(function () { location.reload() }, 2000);
    }
};
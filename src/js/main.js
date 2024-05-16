/* Hämta ner menyn */
window.onload = init;
async function init() {
    const url = "http://127.0.0.1:3000/menu";

    const response = await fetch(url + "/getmenu");
    const data = await response.json();
    console.log(data);
    displayMenu(data);
};

//skriv ut menyn
function displayMenu(data) {
    const menuEl = document.getElementById("menu");
    data.forEach(e => {
        menuEl.innerHTML += 
        `<div class="menuItem">
        <h4 class="foodname">${e.foodname}</h4>
        <p class="ingredients">${e.ingredients}</p>
        <p class="price">${e.price} kr</p> 
        </div>`
    });
}
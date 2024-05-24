/* Hämta ner menyn */
window.onload = init;
async function init() {
    const url = "https://pizzaapi-kzs1.onrender.com/menu";

    const response = await fetch(url + "/getmenu");
    const data = await response.json();
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

//visa och dölj bokningsfönstret

const bookingBtnEl = document.getElementById("booking-btn");
const bookingFormDivEl = document.getElementById("bookingFormDiv");
const closeBtnEl = document.getElementById("closeBtn");

bookingBtnEl.addEventListener('click', () => {
    bookingFormDivEl.classList.toggle("show");
    bookingFormDivEl.classList.toggle("hidden");
    bookingBtnEl.classList.toggle("active");
})

closeBtnEl.addEventListener('click', () => {
    bookingFormDivEl.classList.toggle("show");
    bookingFormDivEl.classList.toggle("hidden");
    bookingBtnEl.classList.toggle("active");
})
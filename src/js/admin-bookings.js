// logga ut-knapp
const logOutBtnEl = document.getElementById("logoutbtn");
logOutBtnEl.addEventListener("click", logout);
function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.href = 'index.html';
}


const url = "https://pizzaapi-kzs1.onrender.com/booking" //URL till mitt API

/* Hämta bokningarna */
window.onload = init;
async function init() {
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
    });
    const data = await response.json();
    console.log(data);
    displayBookings(data);
};

//skriv ut bokningarna
function displayBookings(data) {
    const bookingListEl = document.getElementById("bookingList");

    data.forEach(e => {
        const bookingItem = document.createElement("div");
        bookingItem.classList= "bookingItem";
        bookingItem.innerHTML +=
        `<h4 class="name">Gästens namn: ${e.name}</h4>
        <p class="phonenumber">Telefonnummer: ${e.phonenumber}</p>
        <p class="numberOfGuests">Antal gäster: ${e.numberOfGuests}</p> 
        <p class="date">Datum: ${e.date}</p> 
        <p class="created">Skapad: ${e.created}</p> 
        </div>`;
        const deleteBookingBtn = document.createElement("input");
        deleteBookingBtn.type = "button";
        deleteBookingBtn.value = "Radera bokning";
        deleteBookingBtn.classList = "deleteBtn button";
        deleteBookingBtn.addEventListener('click', () => {
            deleteBooking(e._id);
        });
        bookingListEl.appendChild(bookingItem);
        bookingItem.appendChild(deleteBookingBtn);

    });
};

//radera bokingarna
async function deleteBooking(id) {

    const token = localStorage.getItem('token');

    const response = await fetch(url + "/" + id, {
        method: "DELETE",
        headers: {
            'Authorization': 'Bearer ' + token,
            "Content-Type": "Application/json"
        }});

    const data = await response.json();
    console.log(data);
    if (data.error) {
        /* status.innerHTML = `${data.error}`; */
    } else {
        /* status.innerHTML = `${data.message}`; */
        location.reload()
    }
}
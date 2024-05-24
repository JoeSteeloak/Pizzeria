const url = "https://pizzaapi-kzs1.onrender.com/booking" //URL till mitt API
const bookingFormEl = document.getElementById('bookingForm');

/* funktion för att läsa in datan i formuläret */
const bookBtnEl = document.getElementById("bookBtn");
bookBtnEl.addEventListener('click', (e) => {
    e.preventDefault();

    let name = document.getElementById("booking-name").value;
    let phonenumber = document.getElementById("booking-phone").value;
    let numberOfGuests = document.getElementById("booking-amount").value;
    let date = document.getElementById("booking-date").value;

    createBooking(name, phonenumber, numberOfGuests, date);
});

/* Funktion för att lägga till bokningar i databasen */
async function createBooking(name, phonenumber, numberOfGuests, date) {
    let booking = {
        name: name,
        phonenumber: phonenumber,
        numberOfGuests: numberOfGuests,
        date: date
    }
    let bookingStatus = document.getElementById("bookingStatus");

    const response = await fetch(url + "/", {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(booking)
    });

    const data = await response.json();
    console.log(data);
    if (data.error) {
        bookingStatus.innerHTML = `${data.error}`;
    } else {
        bookingStatus.innerHTML = `${data.message} <i class="fa-solid fa-check"></i>`;
        bookBtnEl.disabled = true;
        bookBtnEl.classList.add("disabled");       
    }
}
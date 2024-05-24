const url = "https://pizzaapi-kzs1.onrender.com/message" //URL till mitt API
const contactFormEl = document.getElementById('contactForm');

/* funktion för att läsa in datan i formuläret */
const contactBtnEl = document.getElementById("submit");
contactBtnEl.addEventListener('click', (e) => {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    createMessage(name, email, message);
});

/* Funktion för att lägga till meddelanden i databasen */
async function createMessage(name, email, message) {
    let contact = {
        name: name,
        email: email,
        message: message,
    };

    const response = await fetch(url + "/", {
        method: "POST",
        headers: {
            "Content-Type": "Application/json"
        },
        body: JSON.stringify(contact)
    });

    const data = await response.json();
    console.log(data);
    if (data.error) {
        console.log(data.error);
    } else {
        let name = document.getElementById("name");
        let email = document.getElementById("email");
        let message = document.getElementById("message");
        name.value = "";
        email.value = "";
        message.value = "";
        contactBtnEl.value = "Tack för meddelandet!";
        setTimeout(() => {
            contactBtnEl.value = "SKICKA!";
        }, "3000")

    }
}


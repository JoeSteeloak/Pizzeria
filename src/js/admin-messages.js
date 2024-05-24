// logga ut-knapp
const logOutBtnEl = document.getElementById("logoutbtn");
logOutBtnEl.addEventListener("click", logout);
function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.href = 'index.html';
}


const url = "https://pizzaapi-kzs1.onrender.com/message" //URL till mitt API

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
    displayMessages(data);
};

//skriv ut meddelandena
function displayMessages(data) {
    const messageListEl = document.getElementById("messageList");

    data.forEach(e => {
        const messageItem = document.createElement("div");
        messageItem.classList= "messageItem";
        messageItem.innerHTML +=
        `<h4 class="name">Namn: ${e.name}</h4>
        <p class="email">Email: ${e.email}</p>
        <p class="message">Meddelande: ${e.message}</p> 
        <p class="created">Skapad: ${e.created}</p> 
        </div>`;
        const deleteMessageBtn = document.createElement("input");
        deleteMessageBtn.type = "button";
        deleteMessageBtn.classList = "deleteBtn button";
        deleteMessageBtn.value = "Radera meddelande";
        deleteMessageBtn.addEventListener('click', () => {
            deleteMessage(e._id);
        });
        messageListEl.appendChild(messageItem);
        messageItem.appendChild(deleteMessageBtn);

    });
};

//radera meddelandena
async function deleteMessage(id) {

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
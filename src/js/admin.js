// logga ut-knapp
const logOutBtnEl = document.getElementById("logoutbtn");
logOutBtnEl.addEventListener("click", logout);
function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    window.location.href = 'index.html';
}
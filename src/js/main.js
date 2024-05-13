/* Ladda ner menyn och visa den */
window.onload = init;
async function init() {
    const url = "http://127.0.0.1:3000/menu";

    const response = await fetch(url + "/getmenu");
    const data = await response.json();
    console.log(data);
};
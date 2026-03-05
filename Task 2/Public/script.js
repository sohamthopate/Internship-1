const socket = io();

const username = prompt("Enter your name:");

socket.emit("new-user", username);

const messages = document.getElementById("messages");
const input = document.getElementById("messageInput");

function sendMessage(){

    const message = input.value;

    if(message.trim() === "") return;

    socket.emit("chat-message", message);

    input.value="";
}

socket.on("chat-message", (data) => {

    const item = document.createElement("li");

    item.classList.add("message");

    item.innerHTML = `
    <strong>${data.username}</strong>: ${data.message}
    <div class="time">${data.time}</div>
    `;

    messages.appendChild(item);

    messages.scrollTop = messages.scrollHeight;
});

socket.on("user-joined", (username) => {

    const item = document.createElement("li");

    item.classList.add("system");

    item.innerText = `${username} joined the chat`;

    messages.appendChild(item);
});

socket.on("user-left", (username) => {

    const item = document.createElement("li");

    item.classList.add("system");

    item.innerText = `${username} left the chat`;

    messages.appendChild(item);
});

input.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        sendMessage();

    }

});
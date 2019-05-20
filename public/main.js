const socket = io();
const form = document.getElementById("form");
const chat = document.getElementById("messages");
form.onsubmit = e => {
    e.preventDefault();
    const input = document.getElementById("m");
    const text = input.value;
    text == '' || socket.emit('chat message', text);
    input.value = '';
    return false;
};
socket.on('chat message', (msg) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(msg));
    chat.appendChild(li);
    chat.scrollTop = chat.offsetHeight;
});
//# sourceMappingURL=main.js.map
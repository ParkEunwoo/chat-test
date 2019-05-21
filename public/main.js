const _name = prompt("이름을 입력하세요");
const socket = io();
socket.emit('joinRoom', 0, _name);
const form = document.querySelector('form');
const chat = document.querySelector('.messages');
form.onsubmit = e => {
    e.preventDefault();
    const input = document.querySelector('.m');
    const text = input.value;
    text == '' || socket.emit('chat message', 0, _name, text);
    input.value = '';
    return false;
};
socket.on('chat message', (num, name, msg) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(msg));
    chat.appendChild(li);
    chat.scrollTop = chat.offsetHeight;
});
//# sourceMappingURL=main.js.map
const _name = prompt("이름을 입력하세요");
const socket = io();
const plus = document.getElementById("plus");
const container = document.getElementById('container');
const chat = [];
const form = [];
let roomNum = 0;
const createRoom = () => {
    const number = roomNum;
    const room = document.createElement("div");
    room.classList.add("room");
    const title = document.createElement("h1");
    title.innerText = "room" + number;
    chat.push(document.createElement("ul"));
    chat[number].classList.add("messages");
    form.push(document.createElement("form"));
    const input = document.createElement("input");
    input.classList.add("m");
    input.type = "text";
    form[number].appendChild(input);
    const button = document.createElement("button");
    button.innerText = "Send";
    form[number].appendChild(button);
    form[number].onclick = e => {
        joinedRoom = number;
        socket.emit('joinRoom', joinedRoom, _name);
    };
    form[number].onsubmit = e => {
        e.preventDefault();
        const text = e.target[0].value;
        text == '' || socket.emit('chat message', joinedRoom, _name, text);
        e.target[0].value = '';
        return false;
    };
    room.appendChild(title);
    room.appendChild(chat[number]);
    room.appendChild(form[number]);
    container.appendChild(room);
    socket.emit('createRoom', number);
    roomNum++;
};
plus.onclick = e => {
    createRoom();
};
let joinedRoom = 0;
socket.on('chat message', (name, msg) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(name + " : " + msg));
    chat[joinedRoom].appendChild(li);
    chat[joinedRoom].scrollTop = chat[joinedRoom].offsetHeight;
});
//# sourceMappingURL=main.js.map
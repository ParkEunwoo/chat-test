const _name = prompt("이름을 입력하세요");
const socket = io();
const plus = document.getElementById("plus");
const container = document.getElementById('container');
const chat = [];
const form = [];
let roomNum = 0;
const createRoom = () => {
    const room = document.createElement("div");
    room.classList.add("room");
    const title = document.createElement("h1");
    title.innerText = "room" + roomNum;
    chat.push(document.createElement("ul"));
    chat[roomNum].classList.add("messages");
    form.push(document.createElement("form"));
    const input = document.createElement("input");
    input.classList.add("m");
    input.type = "text";
    form[roomNum].appendChild(input);
    const button = document.createElement("button");
    button.innerText = "Send";
    form[roomNum].appendChild(button);
    room.appendChild(title);
    room.appendChild(chat[roomNum]);
    room.appendChild(form[roomNum]);
    container.appendChild(room);
    roomNum++;
};
plus.onclick = e => {
    createRoom();
};
let joinedRoom = 0;
const form1 = document.getElementById('room1');
const chat1 = document.getElementById('messages1');
const form2 = document.getElementById('room2');
const chat2 = document.getElementById('messages2');
form1.onclick = e => {
    joinedRoom = 0;
    socket.emit('joinRoom', joinedRoom, _name);
};
form1.onsubmit = e => {
    e.preventDefault();
    const input = document.getElementById('m1');
    const text = input.value;
    text == '' || socket.emit('chat message', joinedRoom, _name, text);
    input.value = '';
    return false;
};
form2.onclick = e => {
    joinedRoom = 1;
    socket.emit('joinRoom', joinedRoom, _name);
};
form2.onsubmit = e => {
    e.preventDefault();
    const input = document.getElementById('m2');
    const text = input.value;
    text == '' || socket.emit('chat message', joinedRoom, _name, text);
    input.value = '';
    return false;
};
socket.on('chat message', (name, msg) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(name + " : " + msg));
    joinedRoom ? chat2.appendChild(li) : chat1.appendChild(li);
    joinedRoom ? chat2.scrollTop = chat2.offsetHeight : chat1.scrollTop = chat1.offsetHeight;
});
//# sourceMappingURL=main.js.map
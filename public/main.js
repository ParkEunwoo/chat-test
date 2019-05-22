const _name = prompt("이름을 입력하세요");
const socket = io();
let roomNum = 0;
const form1 = document.getElementById('room1');
const chat1 = document.getElementById('messages1');
const form2 = document.getElementById('room2');
const chat2 = document.getElementById('messages2');
form1.onclick = e => {
    roomNum = 0;
    socket.emit('joinRoom', roomNum, _name);
};
form1.onsubmit = e => {
    e.preventDefault();
    const input = document.getElementById('m1');
    const text = input.value;
    text == '' || socket.emit('chat message', roomNum, _name, text);
    input.value = '';
    return false;
};
form2.onclick = e => {
    roomNum = 1;
    socket.emit('joinRoom', roomNum, _name);
};
form2.onsubmit = e => {
    e.preventDefault();
    const input = document.getElementById('m2');
    const text = input.value;
    text == '' || socket.emit('chat message', roomNum, _name, text);
    input.value = '';
    return false;
};
socket.on('chat message', (name, msg) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(name + " : " + msg));
    roomNum ? chat2.appendChild(li) : chat1.appendChild(li);
    roomNum ? chat2.scrollTop = chat2.offsetHeight : chat1.scrollTop = chat1.offsetHeight;
});
//# sourceMappingURL=main.js.map
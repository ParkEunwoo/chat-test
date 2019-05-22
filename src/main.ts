const _name: string = prompt("이름을 입력하세요");

const socket = io();


let roomNum: number = 0;

const form1: HTMLFormElement = (<HTMLFormElement>document.getElementById('room1'));
const chat1: HTMLUListElement = (<HTMLUListElement>document.getElementById('messages1'));

const form2: HTMLFormElement = (<HTMLFormElement>document.getElementById('room2'));
const chat2: HTMLUListElement = (<HTMLUListElement>document.getElementById('messages2'));

form1.onclick = e => {
    roomNum = 0;
    socket.emit('joinRoom', roomNum, _name);
}

form1.onsubmit = e => {
    e.preventDefault();
    const input: HTMLInputElement = (<HTMLInputElement>document.getElementById('m1'));
    const text: string = input.value;
    text=='' || socket.emit('chat message', roomNum, _name, text);
    input.value = '';
    return false;
};

form2.onclick = e => {
    roomNum = 1;
    socket.emit('joinRoom', roomNum, _name);
}

form2.onsubmit = e => {
    e.preventDefault();
    const input: HTMLInputElement = (<HTMLInputElement>document.getElementById('m2'));
    const text: string = input.value;
    text=='' || socket.emit('chat message', roomNum, _name, text);
    input.value = '';
    return false;
};


socket.on('chat message', (name:string, msg: string) => {
    const li: HTMLLIElement = (<HTMLLIElement>document.createElement("li"));
    li.appendChild(document.createTextNode(name + " : " + msg));
    roomNum ? chat2.appendChild(li) : chat1.appendChild(li);
    roomNum ? chat2.scrollTop = chat2.offsetHeight : chat1.scrollTop = chat1.offsetHeight;
});
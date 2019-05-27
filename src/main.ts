const _name: string = prompt("이름을 입력하세요");

const socket = io();

const plus: HTMLButtonElement = (<HTMLButtonElement>document.getElementById("plus"));
const container: HTMLDivElement = (<HTMLDivElement>document.getElementById('container'));

const chat: Array<HTMLUListElement> = [];
const form: Array<HTMLFormElement> = [];
let roomNum = 0;

const createRoom = () => {
    const room: HTMLDivElement = (<HTMLDivElement>document.createElement("div"));
    room.classList.add("room");
    const title: HTMLHeadingElement = (<HTMLHeadingElement>document.createElement("h1"));
    title.innerText = "room" + roomNum;
    chat.push(<HTMLUListElement>document.createElement("ul"));
    chat[roomNum].classList.add("messages");
    form.push(<HTMLFormElement>document.createElement("form"));
    const input: HTMLInputElement = (<HTMLInputElement>document.createElement("input"));
    input.classList.add("m");
    input.type = "text";
    form[roomNum].appendChild(input);
    const button: HTMLButtonElement = (<HTMLButtonElement>document.createElement("button"));
    button.innerText = "Send";
    form[roomNum].appendChild(button);

    room.appendChild(title);
    room.appendChild(chat[roomNum]);
    room.appendChild(form[roomNum]);
    container.appendChild(room);
    roomNum++;
}

plus.onclick = e => {
    createRoom();
}

let joinedRoom: number = 0;


const form1: HTMLFormElement = (<HTMLFormElement>document.getElementById('room1'));
const chat1: HTMLUListElement = (<HTMLUListElement>document.getElementById('messages1'));

const form2: HTMLFormElement = (<HTMLFormElement>document.getElementById('room2'));
const chat2: HTMLUListElement = (<HTMLUListElement>document.getElementById('messages2'));

form1.onclick = e => {
    joinedRoom = 0;
    socket.emit('joinRoom', joinedRoom, _name);
}

form1.onsubmit = e => {
    e.preventDefault();
    const input: HTMLInputElement = (<HTMLInputElement>document.getElementById('m1'));
    const text: string = input.value;
    text=='' || socket.emit('chat message', joinedRoom, _name, text);
    input.value = '';
    return false;
};

form2.onclick = e => {
    joinedRoom = 1;
    socket.emit('joinRoom', joinedRoom, _name);
}

form2.onsubmit = e => {
    e.preventDefault();
    const input: HTMLInputElement = (<HTMLInputElement>document.getElementById('m2'));
    const text: string = input.value;
    text=='' || socket.emit('chat message', joinedRoom, _name, text);
    input.value = '';
    return false;
};


socket.on('chat message', (name:string, msg: string) => {
    const li: HTMLLIElement = (<HTMLLIElement>document.createElement("li"));
    li.appendChild(document.createTextNode(name + " : " + msg));
    joinedRoom ? chat2.appendChild(li) : chat1.appendChild(li);
    joinedRoom ? chat2.scrollTop = chat2.offsetHeight : chat1.scrollTop = chat1.offsetHeight;
});
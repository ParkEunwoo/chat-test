const _name: string = prompt("이름을 입력하세요");

const socket = io();

const plus: HTMLButtonElement = (<HTMLButtonElement>document.getElementById("plus"));
const container: HTMLDivElement = (<HTMLDivElement>document.getElementById('container'));

const chat: Array<HTMLUListElement> = [];
const form: Array<HTMLFormElement> = [];
let roomNum = 0;

const createRoom = () => {
    const number: number = roomNum;
    const room: HTMLDivElement = (<HTMLDivElement>document.createElement("div"));
    room.classList.add("room");
    const title: HTMLHeadingElement = (<HTMLHeadingElement>document.createElement("h1"));
    title.innerText = "room" + number;
    chat.push(<HTMLUListElement>document.createElement("ul"));
    chat[number].classList.add("messages");
    form.push(<HTMLFormElement>document.createElement("form"));
    const input: HTMLInputElement = (<HTMLInputElement>document.createElement("input"));
    input.classList.add("m");
    input.type = "text";
    form[number].appendChild(input);
    const button: HTMLButtonElement = (<HTMLButtonElement>document.createElement("button"));
    button.innerText = "Send";
    form[number].appendChild(button);

    form[number].onclick = e => {
        joinedRoom = number;
        socket.emit('joinRoom', joinedRoom, _name);
    }

    form[number].onsubmit = e => {
        e.preventDefault();
        const text: string = e.target[0].value;
        text=='' || socket.emit('chat message', joinedRoom, _name, text);
        e.target[0].value = '';
        
        return false;
    };
    
    room.appendChild(title);
    room.appendChild(chat[number]);
    room.appendChild(form[number]);
    container.appendChild(room);
    socket.emit('createRoom', number);
    roomNum++;
}

plus.onclick = e => {
    createRoom();
}

let joinedRoom: number = 0;


socket.on('chat message', (name:string, msg: string) => {
    const li: HTMLLIElement = (<HTMLLIElement>document.createElement("li"));
    li.appendChild(document.createTextNode(name + " : " + msg));
    chat[joinedRoom].appendChild(li);
    chat[joinedRoom].scrollTop = chat[joinedRoom].offsetHeight;
});
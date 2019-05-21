const _name: string = prompt("이름을 입력하세요");

const socket = io();

socket.emit('joinRoom', 0, _name);

const form: HTMLFormElement = (<HTMLFormElement>document.querySelector('form'));
const chat: HTMLUListElement = (<HTMLUListElement>document.querySelector('.messages'));

form.onsubmit = e => {
    e.preventDefault();
    const input: HTMLInputElement = (<HTMLInputElement>document.querySelector('.m'));
    const text: string = input.value;
    text=='' || socket.emit('chat message', 0, _name, text);
    input.value = '';
    return false;
};


socket.on('chat message', (num: number, name: string, msg: string) => {
    const li: HTMLLIElement = (<HTMLLIElement>document.createElement("li"));
    li.appendChild(document.createTextNode(msg));
    chat.appendChild(li);
    chat.scrollTop = chat.offsetHeight;
});
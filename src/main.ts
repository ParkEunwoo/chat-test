//const _name: string = prompt("이름을 입력하세요");

const socket = io();

const form: HTMLFormElement = (<HTMLFormElement>document.querySelector('form'));
const chat: HTMLUListElement = (<HTMLUListElement>document.querySelector('.messages'));

form.onsubmit = e => {
    e.preventDefault();
    const input: HTMLInputElement = (<HTMLInputElement>document.querySelector('.m'));
    const text: string = input.value;
    text=='' || socket.emit('chat message', `: ${text}`);
    input.value = '';
    return false;
};


socket.on('chat message', (msg: string) => {
    const li: HTMLLIElement = (<HTMLLIElement>document.createElement("li"));
    li.appendChild(document.createTextNode(msg));
    chat.appendChild(li);
    chat.scrollTop = chat.offsetHeight;
});
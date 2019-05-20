const socket = io();

const form: HTMLFormElement = (<HTMLFormElement>document.getElementById("form"));
const chat: HTMLUListElement = (<HTMLUListElement>document.getElementById("messages"));

form.onsubmit = e => {
    e.preventDefault();
    const input: HTMLInputElement = (<HTMLInputElement>document.getElementById("m"));
    const text: string = input.value;
    socket.emit('chat message', text);
    input.value = '';
    return false;
};


socket.on('chat message', (msg) => {
    const li: HTMLLIElement = (<HTMLLIElement>document.createElement("li"));
    li.appendChild(document.createTextNode(msg));
    chat.appendChild(li);
    chat.scrollTop = chat.offsetHeight;
});
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enOnWindowError = exports.enAlert = exports.enError = exports.enLog = void 0;
function createLogBox() {
    var div = document.createElement('div');
    div.id = "log-box";
    div.style.width = '100%';
    div.style.height = '300px';
    div.style.backgroundColor = 'white';
    div.style.border = '1px solid black';
    div.style.overflow = 'scroll';
    div.style.display = 'none';
    div.style.position = 'fixed';
    div.style.bottom = '100px';
    div.style.fontSize = '24px';
    div.style.fontFamily = 'Arial';
    document.body.appendChild(div);
    return div;
}
function enConsole(message, type = 'log') {
    var logBox = document.getElementById("log-box");
    if (logBox === null) {
        logBox = createLogBox();
    }
    let timestamp = new Date().toLocaleTimeString();
    var text = document.createTextNode(`[${timestamp}]${type == 'log' ? '[INFO] - '
        : '[ERROR] - '}${message}`);
    var p = document.createElement('p');
    p.appendChild(text);
    logBox.insertBefore(p, logBox.firstChild);
    if (window.debugMode == true)
        logBox.style.display = 'block';
    if (type === 'log') {
        p.style.color = 'black';
    }
    if (type === 'error') {
        p.style.color = 'red';
    }
}
function createMessageBox() {
    var div = document.createElement('div');
    var p = document.createElement('p');
    var button = document.createElement('button');
    button.innerHTML = 'Close';
    button.onclick = function () {
        div.style.display = 'none';
        let par = div.getElementsByTagName('p')[0];
        par.innerHTML = '';
    };
    button.style.maxWidth = '80%';
    button.style.backgroundColor = 'blue';
    button.style.color = 'white';
    button.style.borderRadius = '3px';
    button.style.fontSize = '48px';
    div.id = "message-box";
    div.style.width = '80%';
    div.style.backgroundColor = 'white';
    div.style.border = '1px solid black';
    div.style.display = 'block';
    div.style.position = 'fixed';
    div.style.top = '50%';
    div.style.left = '50%';
    div.style.fontSize = '48px';
    div.style.fontFamily = 'Arial';
    div.style.textAlign = 'center';
    div.style.transform = 'translate(-50%, -50%)';
    div.style.padding = '20px';
    div.appendChild(p);
    div.appendChild(button);
    document.body.appendChild(div);
    return { div, p, button };
}
function xAlert(message) {
    var messageBox = document.getElementById("message-box");
    if (messageBox === null) {
        let { div: messageBox, p: par, button: button } = createMessageBox();
        let text = document.createTextNode(message);
        par.appendChild(text);
        return;
    }
    let par = messageBox.getElementsByTagName('p')[0];
    par.innerHTML = '';
    let button = messageBox.getElementsByTagName('button')[0];
    let text = document.createTextNode(message);
    messageBox.style.display = 'block';
    par.appendChild(text);
}
function enLog(...args) {
    let xmessage = serializeMessage(args);
    enConsole(xmessage, 'log');
}
exports.enLog = enLog;
function enError(...args) {
    let xmessage = serializeMessage(args);
    enConsole(xmessage, 'error');
}
exports.enError = enError;
function enAlert(message) {
    let xmessage = serializeMessage([message]);
    xAlert(xmessage);
}
exports.enAlert = enAlert;
function enOnWindowError(message) {
    if (typeof message === 'string') {
        xAlert(message);
        return;
    }
    if (typeof message === 'object') {
        xAlert(serializeMessage(message));
    }
}
exports.enOnWindowError = enOnWindowError;
function serializeMessage(args) {
    let xmessage = '';
    args.map((arg) => {
        if (typeof arg === 'string') {
            xmessage += arg + ', ';
        }
        if (typeof arg === 'object') {
            xmessage += JSON.stringify(arg);
        }
    });
    return xmessage;
}

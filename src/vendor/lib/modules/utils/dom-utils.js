"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeSupportStyle = exports.GenerateTransparentMeta = exports.GenerateSupporStyles = void 0;
function GenerateSupporStyles(doc) {
    const style = doc.createElement("style");
    style.innerHTML = `
    body{
        background-color: transparent!important;
        font-size: 48px;
      };`;
    style.id = 'endymion-background-style';
    doc.head.appendChild(style);
}
exports.GenerateSupporStyles = GenerateSupporStyles;
function GenerateTransparentMeta(doc) {
    const meta = doc.createElement("meta");
    meta.setAttribute("name", "transparent");
    meta.setAttribute("content", "true");
    doc.head.appendChild(meta);
}
exports.GenerateTransparentMeta = GenerateTransparentMeta;
function removeSupportStyle() {
    const style = document.getElementById('endymion-background-style');
    if (style !== null) {
        style.remove();
    }
}
exports.removeSupportStyle = removeSupportStyle;

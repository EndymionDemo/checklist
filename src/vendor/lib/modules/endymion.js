"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.En = void 0;
const en_1 = require("./endymion/en");
Object.defineProperty(exports, "En", { enumerable: true, get: function () { return en_1.En; } });
const dom_utils_1 = require("./utils/dom-utils");
(0, dom_utils_1.GenerateSupporStyles)(document);
(0, dom_utils_1.GenerateTransparentMeta)(document);
window.en = new en_1.En();
window.removeSupportStyle = dom_utils_1.removeSupportStyle;
window.EnSpace = {
    objectId: 0,
    environment: 'web-browser',
    debugMode: false,
    apiVersion: '2.4.3',
};

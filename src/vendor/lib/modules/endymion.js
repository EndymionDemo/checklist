"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.En = void 0;
const en_1 = require("./endymion/en");
Object.defineProperty(exports, "En", { enumerable: true, get: function () { return en_1.En; } });
const dom_utils_1 = require("./utils/dom-utils");
const analytics_1 = require("./utils/analytics");
(0, dom_utils_1.GenerateSupporStyles)(document);
(0, analytics_1.ApplyAnalytics)(document, '66d201a048ad8047c37d9115');
window.en = new en_1.En();
window.removeSupportStyle = dom_utils_1.removeSupportStyle;
window.EnSpace = {
    objectId: 0,
    environment: 'web-browser',
    debugMode: false,
    version: '2.6.0',
    apiVersion: '3'
};

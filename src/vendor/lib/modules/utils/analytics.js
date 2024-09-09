"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyAnalytics = void 0;
function ApplyAnalytics(doc, code) {
    let script = doc.createElement('script');
    script.setAttribute('defer', '');
    script.setAttribute('src', 'https://cdn.jsdelivr.net/gh/litlyx/litlyx-js/browser/litlyx.js');
    script.setAttribute('data-project', code);
    doc.head.appendChild(script);
}
exports.ApplyAnalytics = ApplyAnalytics;

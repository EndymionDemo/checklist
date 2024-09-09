"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyGoogleAnalyticsScript = void 0;
function ApplyGoogleAnalyticsScript(doc, code) {
    let script = doc.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('src', 'https://www.googletagmanager.com/gtag/js?id=' + code);
    script.addEventListener('load', function (event) {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args) { window.dataLayer.push(args); }
        ;
        gtag('js', new Date());
        gtag('config', code);
    });
    doc.head.appendChild(script);
}
exports.ApplyGoogleAnalyticsScript = ApplyGoogleAnalyticsScript;

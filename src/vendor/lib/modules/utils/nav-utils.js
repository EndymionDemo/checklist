"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Win = void 0;
class Win {
    w;
    constructor(w = window) {
        this.w = w;
    }
    getCurrentProtocol() {
        return this.w.location.protocol;
    }
    getCurrentHost() {
        return this.w.location.host;
    }
    getCurrentPort() {
        return this.w.location.port;
    }
}
exports.Win = Win;

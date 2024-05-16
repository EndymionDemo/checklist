"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnWebview = void 0;
const en_base_entity_1 = require("./en-base-entity");
class EnWebview extends en_base_entity_1.BaseEntity {
    commInterface;
    w;
    type = 'webview';
    webViewParent;
    url = '';
    webViewType = 'flat-fixed';
    constructor(commInterface = 'vuplex', w = window) {
        super(commInterface, w);
        this.commInterface = commInterface;
        this.w = w;
        this.entity.primitive = this.type;
    }
    setColor(color) {
        throw new Error("[en-webview][setColor] - Method not allowed on EnWebview");
    }
    setOpacity(value) {
        throw new Error("[en-webview][setOpacity] - Method not allowed on EnWebview");
    }
    setUrl(url) {
        url = url.includes('http')
            ? url
            : `${this.win.getCurrentProtocol()}//${this.win.getCurrentHost()}/${url}`;
        this.url = url;
        return this;
    }
    setParent(webViewParent) {
        this.webViewParent = webViewParent;
        return this;
    }
    setType(type) {
        this.webViewType = type;
        return this;
    }
    setOrientation(orientation) {
        if (orientation == null)
            throw new Error('[en-webview][sendMessage] - orientation is required');
        let action = {
            name: 'webview-set-orientation',
            payload: {
                id: this.entity.id,
                mode: orientation
            }
        };
        this.actions.push(action);
        return this;
    }
    sendMessage(destinationId, message) {
        if (destinationId < 0)
            throw new Error('[en-webview][sendMessage] - destination webview id is required');
        if (message == '' || message == null)
            throw new Error('[en-webview][sendMessage] - message is required');
        let action = {
            name: 'webview-send-message',
            payload: {
                id: destinationId,
                message: message
            }
        };
        this.actions.push(action);
    }
    create() {
        if (!this.url)
            throw new Error('[en-webview][create] - url is required');
        this.entity.id = this.isCustomId ? this.customId : this.core.generateObjectId();
        this.actions = [
            {
                name: 'webview-create',
                payload: {
                    id: this.entity.id,
                    type: this.webViewType,
                    url: this.url,
                    parent: this.webViewParent,
                    transform: {
                        rotation: this.entity.rotation,
                        position: this.entity.position,
                        scale: this.entity.scale
                    }
                }
            }
        ];
        super.create();
        return this;
    }
}
exports.EnWebview = EnWebview;

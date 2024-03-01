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
        this.url = url;
        return this;
    }
    setParent(webViewParent) {
        this.webViewParent = webViewParent;
        return this;
    }
    create() {
        if (!this.url)
            throw new Error('[en-webview][create] - url is required');
        this.entity.id = this.id;
        this.actions = [
            { name: 'webview-create', payload: { id: this.entity.id, url: this.url, parent: this.webViewParent } },
            {
                name: 'actor-set-transform', payload: {
                    id: this.entity.id,
                    rotation: this.entity.rotation,
                    position: this.entity.position,
                    scale: this.entity.scale
                }
            }
        ];
        super.create();
        return this;
    }
}
exports.EnWebview = EnWebview;

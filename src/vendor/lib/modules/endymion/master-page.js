"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterPage = void 0;
class MasterPage {
    en;
    pages = [];
    constructor(en) {
        this.en = en;
    }
    addPage(name, url, placeholderUrl, pageTransform, placeholderTransform = null, inherit_transform = null) {
        this.pages.push({
            name,
            url,
            transform: pageTransform,
            placeholder: {
                url: placeholderUrl,
                transform: placeholderTransform
            },
            inherit_transform
        });
    }
    addPages(pages) {
        this.pages = pages;
    }
    connect() {
        this.pages.map(page => {
            let cube = this.en.cube();
            cube.setColor('lime')
                .setOpacity(0.5)
                .create();
        });
    }
}
exports.MasterPage = MasterPage;

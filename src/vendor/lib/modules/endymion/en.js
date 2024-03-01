"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.En = void 0;
const endymion_core_v2_1 = require("./endymion-core-v2");
const en_cube_1 = require("../entities/en-cube");
const en_sphere_1 = require("../entities/en-sphere");
const en_cylinder_1 = require("../entities/en-cylinder");
const en_asset_1 = require("../entities/en-asset");
const en_capsule_1 = require("../entities/en-capsule");
const en_plane_1 = require("../entities/en-plane");
const en_quad_1 = require("../entities/en-quad");
const en_webview_1 = require("../entities/en-webview");
const en_shape_line_1 = require("../entities/en-shape-line");
const master_page_1 = require("./master-page");
const rxjs_1 = require("rxjs");
class En {
    commInterface;
    w;
    core;
    message = new rxjs_1.Subject();
    actionResult = new rxjs_1.Subject();
    trackImage = new rxjs_1.Subject();
    message$ = this.message.asObservable().pipe((0, rxjs_1.tap)((message) => {
        if (this.core.isDebugMode()) {
            console.log(message);
        }
    }));
    actionResult$ = this.actionResult.asObservable();
    trackImage$ = this.trackImage.asObservable();
    constructor(commInterface = 'vuplex', w = window) {
        this.commInterface = commInterface;
        this.w = w;
        this.core = new endymion_core_v2_1.EndymionCore(commInterface, w);
        var that = this;
        this.core.communicationInterface.addEventListener('message', function (event) {
            let jsonStr = event.data;
            let json = JSON.parse(jsonStr);
            let name = json.name;
            let payload = json.payload;
            if (!name || !payload)
                return;
            switch (name) {
                case 'api-on-result':
                    that.actionResult.next({ name: name, type: 'message', payload: payload });
                    break;
                case 'tracker-on-image':
                    that.trackImage.next({ name: name, type: 'message', payload: payload });
                    break;
            }
            that.message.next({ name: name, type: 'message', payload: payload });
        });
    }
    enableDebug = () => {
        this.core.enableDebug();
    };
    disableDebug = () => {
        this.core.disableDebug();
    };
    asset = () => new en_asset_1.EnAsset(this.commInterface, this.w);
    capsule = () => new en_capsule_1.EnCapsule(this.commInterface, this.w);
    cube = () => new en_cube_1.EnCube(this.commInterface, this.w);
    cylinder = () => new en_cylinder_1.EnCylinder(this.commInterface, this.w);
    plane = () => new en_plane_1.EnPlane(this.commInterface, this.w);
    quad = () => new en_quad_1.EnQuad(this.commInterface, this.w);
    sphere = () => new en_sphere_1.EnSphere(this.commInterface, this.w);
    webview = () => new en_webview_1.EnWebview(this.commInterface, this.w);
    line = () => new en_shape_line_1.EnShapeLine(this.commInterface, this.w);
    masterPage = () => new master_page_1.MasterPage(this);
    addTrakingImage = (url) => {
        let id = this.core.getObjectId();
        let payload = {
            id: id,
            url: url,
            refWidth: 0.1
        };
        this.core.sendActions([{ name: 'tracker-add-image', payload: payload }]);
    };
}
exports.En = En;

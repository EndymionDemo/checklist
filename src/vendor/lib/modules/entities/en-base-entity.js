"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
const endymion_core_v2_1 = require("../endymion/endymion-core-v2");
const rxjs_1 = require("rxjs");
const nav_utils_1 = require("../utils/nav-utils");
const color_utils_1 = require("../utils/color-utils");
class BaseEntity {
    commInterface;
    w;
    win;
    isCreated = false;
    updated = new rxjs_1.Subject();
    colorUpdated = new rxjs_1.Subject();
    opacityUpdated = new rxjs_1.Subject();
    positionUpdated = new rxjs_1.Subject();
    rotationUpdated = new rxjs_1.Subject();
    scaleUpdated = new rxjs_1.Subject();
    created = new rxjs_1.Subject();
    applyed = new rxjs_1.Subject();
    applyError = new rxjs_1.Subject();
    error = new rxjs_1.Subject();
    createdError = new rxjs_1.Subject();
    setAimableUpdated = new rxjs_1.Subject();
    message = new rxjs_1.Subject();
    aimed = new rxjs_1.Subject();
    clicked = new rxjs_1.Subject();
    webViewVisible = new rxjs_1.Subject();
    isClickable = new rxjs_1.Subject();
    hapticPlay = new rxjs_1.Subject();
    destroyed = new rxjs_1.Subject();
    actionResult = new rxjs_1.Subject();
    posXS = new rxjs_1.BehaviorSubject(0);
    posYS = new rxjs_1.BehaviorSubject(0);
    posZS = new rxjs_1.BehaviorSubject(0);
    rotXS = new rxjs_1.BehaviorSubject(0);
    rotYS = new rxjs_1.BehaviorSubject(0);
    rotZS = new rxjs_1.BehaviorSubject(0);
    scaleXS = new rxjs_1.BehaviorSubject(0);
    scaleYS = new rxjs_1.BehaviorSubject(0);
    scaleZS = new rxjs_1.BehaviorSubject(0);
    opacityS = new rxjs_1.BehaviorSubject(0);
    customId = 0;
    isCustomId = false;
    entity = {
        id: 0,
        primitive: 'cube',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        color: { r: 0, g: 0, b: 0, a: 1 },
        clickable: false,
        active: true,
        aimable: false,
        playHaptic: false
    };
    get state() {
        return this.entity;
    }
    ;
    get id() {
        return this.entity.id;
    }
    get pos() {
        return this.entity.position;
    }
    get rot() {
        return this.entity.rotation;
    }
    get scale() {
        return this.entity.scale;
    }
    get color() {
        return this.entity.color;
    }
    get clickable() {
        return this.entity.clickable;
    }
    get active() {
        return this.entity.active;
    }
    get aimable() {
        return this.entity.aimable;
    }
    get playHaptic() {
        return this.entity.playHaptic;
    }
    core;
    _actions = [];
    get actions() {
        return this._actions;
    }
    set actions(actions) {
        if (!actions)
            throw new Error(`[en-primitive][actions] - value is not valid - ${actions}`);
        if (actions.length === 0) {
            this._actions = [];
            return;
        }
        this._actions.map(action => {
            action.payload.id = this.entity.id;
        });
        actions.map(action => {
            let findend = this._actions.findIndex(a => a.name === action.name
                && a.payload.id === action.payload.id);
            if (findend < 0) {
                this._actions.unshift(action);
            }
        });
    }
    updated$ = this.updated.asObservable();
    colorUpdated$ = this.colorUpdated.asObservable();
    opacityUpdated$ = this.opacityUpdated.asObservable();
    positionUpdated$ = this.positionUpdated.asObservable();
    rotationUpdated$ = this.rotationUpdated.asObservable();
    scaleUpdated$ = this.scaleUpdated.asObservable();
    setAimableUpdated$ = this.setAimableUpdated.asObservable();
    setActiveUpdated = new rxjs_1.Subject();
    setActiveUpdated$ = this.setActiveUpdated.asObservable();
    created$ = this.created.asObservable();
    applyed$ = this.applyed.asObservable();
    applyError$ = this.applyError.asObservable();
    createdError$ = this.createdError.asObservable();
    error$ = this.error.asObservable();
    aimed$ = this.aimed.asObservable();
    clicked$ = this.clicked.asObservable();
    webViewVisible$ = this.webViewVisible.asObservable();
    isClickable$ = this.isClickable.asObservable();
    hapticPlay$ = this.hapticPlay.asObservable();
    destroyed$ = this.destroyed.asObservable();
    actionResult$ = this.actionResult.asObservable();
    posX$ = this.posXS.asObservable();
    posY$ = this.posYS.asObservable();
    posZ$ = this.posZS.asObservable();
    rotX$ = this.rotXS.asObservable();
    rotY$ = this.rotYS.asObservable();
    rotZ$ = this.rotZS.asObservable();
    scaleX$ = this.scaleXS.asObservable();
    scaleY$ = this.scaleYS.asObservable();
    scaleZ$ = this.scaleZS.asObservable();
    opacity$ = this.opacityS.asObservable();
    message$ = this.message.asObservable().pipe((0, rxjs_1.tap)((message) => {
        if (this.core.isDebugMode()) {
            console.log(message);
        }
    }));
    constructor(commInterface = 'vuplex', w = window) {
        this.commInterface = commInterface;
        this.w = w;
        this.core = new endymion_core_v2_1.EndymionCore(commInterface, w);
        this.win = new nav_utils_1.Win(this.core.window);
        var that = this;
        this.core.communicationInterface.addEventListener('message', function (event) {
            let jsonStr = event.data;
            let json = JSON.parse(jsonStr);
            let name = json.name;
            let payload = json.payload;
            if (!name || !payload)
                return;
            if (payload.id == that.entity.id) {
                switch (name) {
                    case 'actor-on-aim':
                        if (that.entity.playHaptic) {
                            that.core.playHaptic();
                            that.hapticPlay.next(true);
                        }
                        that.aimed.next({ name: name, type: 'message', payload: payload });
                        break;
                    case 'actor-on-click':
                        if (that.entity.playHaptic) {
                            that.core.playHaptic();
                            that.hapticPlay.next(true);
                        }
                        that.clicked.next({ name: name, type: 'message', payload: payload });
                        break;
                    case 'webview-visible':
                        that.webViewVisible.next({ name: name, type: 'message', payload: payload });
                        break;
                }
                that.message.next({ name: name, type: 'message', payload: payload });
            }
        });
    }
    create() {
        if (this.isCreated)
            throw new Error('[en-primitive][create] - Entity already created');
        try {
            this.core.sendActions(this.actions);
            this.created.next(this.actions);
            this.actions = [];
            this.isCreated = true;
        }
        catch (e) {
            this.createdError.next({ method: 'create', error: e });
            this.error.next({ method: 'create', error: e });
        }
    }
    apply() {
        if (!this.isCreated)
            throw new Error('[en-primitive][apply] - Entity not created');
        try {
            this.core.sendActions(this.actions);
            this.applyed.next(this.actions);
            this.actions = [];
        }
        catch (e) {
            this.applyError.next({ method: 'apply', error: e });
            this.error.next({ method: 'apply', error: e });
        }
    }
    destroy() {
        try {
            this.actions.push({ name: 'actor-destroy', payload: { id: this.entity.id } });
            this.core.sendActions(this.actions);
            this.destroyed.next(true);
        }
        catch (e) {
            this.error.next({ method: 'destroy', error: e });
        }
    }
    setId(id) {
        this.isCustomId = true;
        this.customId = id;
        return this;
    }
    setPos(x, y, z) {
        if (typeof x !== 'number')
            throw new Error('[en-primitive][setPos] - x value is not valid');
        if (typeof y !== 'number')
            throw new Error('[en-primitive][setPos] - y value is not valid');
        if (typeof z !== 'number')
            throw new Error('[en-primitive][setPos] - z value is not valid');
        if (this.entity.position.x !== x)
            this.posXS.next(x);
        if (this.entity.position.y !== x)
            this.posYS.next(y);
        if (this.entity.position.z !== z)
            this.posZS.next(z);
        this.entity.position = { x: x, y: y, z: z };
        this.updated.next({ name: 'actor-set-transform', type: 'update', payload: { position: this.entity.position } });
        this.positionUpdated.next(this.entity.position);
        if (this.isCreated) {
            this.actions.push({ name: 'actor-set-transform', payload: { id: this.entity.id.toString(), position: this.entity.position } });
        }
        return this;
    }
    addPos(x, y, z) {
        if (typeof x !== 'number')
            throw new Error('[en-primitive][addPos] - x value is not valid');
        if (typeof y !== 'number')
            throw new Error('[en-primitive][addPos] - y value is not valid');
        if (typeof z !== 'number')
            throw new Error('[en-primitive][addPos] - z value is not valid');
        this.entity.position = { x: x, y: y, z: z };
        this.updated.next({ name: 'actor-add-transform', type: 'update', payload: { position: { x, y, z } } });
        this.positionUpdated.next(this.entity.position);
        this.actions.push({ name: 'actor-add-transform', payload: { id: this.entity.id.toString(), position: this.entity.position } });
        return this;
    }
    setRot(x, y, z) {
        if (typeof x !== 'number')
            throw new Error('[en-primitive][setRot] - x value is not valid');
        if (typeof y !== 'number')
            throw new Error('[en-primitive][setRot] - y value is not valid');
        if (typeof z !== 'number')
            throw new Error('[en-primitive][setRot] - z value is not valid');
        if (this.entity.rotation.x !== x)
            this.rotXS.next(x);
        if (this.entity.rotation.y !== x)
            this.rotYS.next(y);
        if (this.entity.rotation.z !== z)
            this.rotZS.next(z);
        this.entity.rotation = { x: x, y: y, z: z };
        this.updated.next({ name: 'actor-set-transform', type: 'update', payload: { rotation: this.entity.rotation } });
        this.rotationUpdated.next(this.entity.rotation);
        if (this.isCreated) {
            this.actions.push({ name: 'actor-set-transform', payload: { id: this.entity.id.toString(), rotation: this.entity.rotation } });
        }
        return this;
    }
    addRot(x, y, z) {
        if (typeof x !== 'number')
            throw new Error('[en-primitive][addRot] - x value is not valid');
        if (typeof y !== 'number')
            throw new Error('[en-primitive][addRot] - y value is not valid');
        if (typeof z !== 'number')
            throw new Error('[en-primitive][addRot] - z value is not valid');
        this.entity.rotation = { x: x, y: y, z: z };
        this.updated.next({ name: 'actor-add-transform', type: 'update', payload: { rotation: { x, y, z } } });
        this.rotationUpdated.next(this.entity.rotation);
        this.actions.push({ name: 'actor-add-transform', payload: { id: this.entity.id.toString(), rotation: this.entity.rotation } });
        return this;
    }
    setScale(x, y, z) {
        if (typeof x !== 'number')
            throw new Error('[en-primitive][setScale] - x value is not valid');
        if (typeof y !== 'number')
            throw new Error('[en-primitive][setScale] - y value is not valid');
        if (typeof z !== 'number')
            throw new Error('[en-primitive][setScale] - z value is not valid');
        if (x == null || x == undefined)
            throw new Error('[en-primitive][setScale] - x value is not valid');
        if ((y == null || y == undefined) && (z == null || z == undefined)) {
            y = x;
            z = x;
        }
        if (this.entity.scale.x !== x)
            this.scaleXS.next(x);
        if (this.entity.scale.y !== x)
            this.scaleYS.next(y);
        if (this.entity.scale.z !== z)
            this.scaleZS.next(z);
        this.entity.scale = { x: x, y: y, z: z };
        this.updated.next({ name: 'actor-set-transform', type: 'update', payload: { scale: this.entity.scale } });
        this.scaleUpdated.next(this.entity.scale);
        if (this.isCreated) {
            this.actions.push({ name: 'actor-set-transform', payload: { id: this.entity.id.toString(), scale: this.entity.scale } });
        }
        return this;
    }
    addScale(x, y, z) {
        if (x == null || x == undefined)
            throw new Error('[en-primitive][setScale] - x value is not valid');
        if ((y == null || y == undefined) && (z == null || z == undefined)) {
            y = x;
            z = x;
        }
        this.entity.scale = { x: x, y: y, z: z };
        this.updated.next({ name: 'actor-add-transform', type: 'update', payload: { scale: { x, y, z } } });
        this.scaleUpdated.next(this.entity.scale);
        this.actions.push({ name: 'actor-add-transform', payload: { id: this.entity.id.toString(), scale: this.entity.scale } });
        return this;
    }
    setColor(color) {
        if (color === undefined)
            throw new Error('[en-primitive][setcolor] - color value is not valid');
        let selectedColor = { r: 0, g: 0, b: 0, a: 1 };
        if (typeof color === 'string') {
            if (color.includes('#')) {
                selectedColor = (0, color_utils_1.hexToRGB)(color);
            }
            if (color.includes('rgb')) {
                const rgb = color.replace('rgb(', '').replace(')', '').split(',');
                selectedColor = { r: parseInt(rgb[0]), g: parseInt(rgb[1]), b: parseInt(rgb[2]), a: 1 };
            }
            if (color.includes('rgba')) {
                const rgb = color.replace('rgba(', '').replace(')', '').split(',');
                selectedColor = { r: parseInt(rgb[0]), g: parseInt(rgb[1]), b: parseInt(rgb[2]), a: parseFloat(rgb[3]) };
            }
            if ((0, color_utils_1.namedColor)().has(color.toUpperCase())) {
                var hexColor = (0, color_utils_1.namedColor)().get(color.toUpperCase());
                selectedColor = (0, color_utils_1.hexToRGB)(hexColor);
            }
            if (color === 'transparent') {
                selectedColor = { r: 0, g: 0, b: 0, a: 0 };
            }
        }
        if (typeof color === 'object'
            && color !== null
            && color !== undefined
            && color.hasOwnProperty('r')
            && color.hasOwnProperty('g')
            && color.hasOwnProperty('b')
            && color.hasOwnProperty('a')) {
            selectedColor = color;
        }
        if (selectedColor.r < 0)
            throw new Error('[en-primitive][setcolor] - r color value is not valid');
        if (selectedColor.g < 0)
            throw new Error('[en-primitive][setcolor] - g color value is not valid');
        if (selectedColor.b < 0)
            throw new Error('[en-primitive][setcolor] - b color value is not valid');
        if (selectedColor.a < 0)
            throw new Error('[en-primitive][setcolor] - a color value is not valid');
        if (selectedColor.r > 255)
            throw new Error('[en-primitive][setcolor] - r color value must be minor or equal to 255');
        if (selectedColor.g > 255)
            throw new Error('[en-primitive][setcolor] - g color value must be minor or equal to 255');
        if (selectedColor.b > 255)
            throw new Error('[en-primitive][setcolor] - b color value must be minor or equal to 255');
        if (selectedColor.a > 1)
            throw new Error('[en-primitive][setcolor] - a color value must be minor or equal to 1');
        if (!isInt(selectedColor.r))
            throw new Error('[en-primitive][setcolor] - r color value must be an integer');
        if (!isInt(selectedColor.g))
            throw new Error('[en-primitive][setcolor] - g color value must be an integer');
        if (!isInt(selectedColor.b))
            throw new Error('[en-primitive][setcolor] - b color value must be an integer');
        this.entity.color = { r: selectedColor.r / 255, g: selectedColor.g / 255, b: selectedColor.b / 255, a: selectedColor.a };
        this.updated.next({ name: 'color', type: 'update', payload: { color: this.entity.color } });
        this.colorUpdated.next(this.entity.color);
        this.actions.push({ name: 'primitive-set-color', payload: { id: this.entity.id, color: this.entity.color } });
        return this;
    }
    setOpacity(value) {
        if (value < 0)
            throw new Error('[en-primitive][setOpacity] - opacity value is not valid');
        if (value > 1)
            throw new Error('[en-primitive][setOpacity] - opacity value must be minor or equal to 1');
        if (this.entity.color.a !== value)
            this.opacityS.next(value);
        this.entity.color.a = value;
        this.updated.next({ name: 'color', type: 'update', payload: { color: this.entity.color } });
        this.colorUpdated.next(this.entity.color);
        return this;
    }
    setAimable(value, radius = 0.1) {
        this.entity.aimable = value;
        this.updated.next({ name: 'actor-set-aimable', type: 'update', payload: { enabled: value, radius: radius } });
        this.setAimableUpdated.next({ enabled: value, radius: radius });
        this.actions.push({ name: 'actor-set-aimable', payload: { id: this.entity.id, enabled: this.entity.aimable, radius: radius } });
        return this;
    }
    setActive(value) {
        this.entity.active = value;
        this.updated.next({ name: 'actor-set-active', type: 'update', payload: { activated: value } });
        this.setActiveUpdated.next(value);
        this.actions.push({ api: 2, name: 'actor-set-active', payload: { id: this.entity.id, activated: this.entity.active } });
        return this;
    }
    setClickable(value) {
        this.entity.clickable = value;
        this.updated.next({ name: 'actor-set-clickable', type: 'update', payload: { clickable: value } });
        this.isClickable.next(value);
        this.actions.push({ name: 'actor-set-clickable', payload: { id: this.entity.id, enabled: this.entity.clickable } });
        return this;
    }
    setHapticFeedback(value) {
        this.entity.playHaptic = value;
        return this;
    }
}
exports.BaseEntity = BaseEntity;
function isInt(value) {
    var x;
    if (isNaN(value)) {
        return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
}

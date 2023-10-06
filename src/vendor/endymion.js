"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebApi = void 0;
var rxjs_1 = require("rxjs");
var WebApi = /** @class */ (function () {
    function WebApi() {
        var _this = this;
        this.messageIn = new rxjs_1.Subject();
        this.messageIn$ = this.messageIn.asObservable();
        this.objectId = 0;
        this.createAction = function (actName, actPayload) {
            var act = {
                name: actName,
                payload: actPayload
            };
            return act;
        };
        this.sendAction = function (name, payload) {
            var jsonAction = _this.createAction(name, payload);
            window.vuplex.postMessage(jsonAction);
        };
        this.sendActions = function (actionArray) {
            var jsonAction = _this.createAction('multi-action', actionArray);
            window.vuplex.postMessage(jsonAction);
        };
        this.destroyObject = function (objectId) {
            _this.sendAction('destroy-object', {
                id: objectId
            });
        };
        this.createObject = function (objectId, primitive, position, rotation, scale) {
            _this.sendAction('create-primitive', {
                id: objectId,
                primitive: primitive,
                position: position,
                rotation: rotation,
                scale: scale
            });
            return _this.objectId;
        };
        this.importGltf = function (source) {
            _this.objectId++;
            var action = _this.createAction('import-gltf', {
                id: _this.objectId,
                url: source
            });
            return {
                objectId: _this.objectId,
                action: action
            };
        };
        //not usable because cannot set sigle greatness at time
        //we have must set all greatness at time
        this.updateTransform = function (objectId, type, greatness, value) {
            var request = { id: objectId, type: type };
            if (greatness === 'position')
                request['position'] = value;
            if (greatness === 'rotation')
                request['rotation'] = value;
            if (greatness === 'scale')
                request['scale'] = value;
            var action = _this.createAction('update-transform', request);
            return {
                objectId: objectId,
                action: action
            };
        };
        this.setColor = function (objectId, color) {
            _this.sendAction('set-color', {
                id: objectId,
                color: {
                    r: color.r / 255,
                    g: color.g / 255,
                    b: color.b / 255,
                    a: color.a
                }
            });
        };
        this.vuplex = window.vuplex;
        if (this.vuplex == undefined
            || this.vuplex === ''
            || this.vuplex === null)
            console.log("vuplex is not setted");
        window.vuplex.addEventListener('message', function (event) {
            _this.messageIn.next(event.data);
        });
    }
    WebApi.prototype.playHaptic = function () {
        this.sendAction('play-haptic', {});
    };
    return WebApi;
}());
exports.WebApi = WebApi;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndymionCore = void 0;
const debug_1 = require("../utils/debug");
class EndymionCoreV2 {
    messageStack = [];
    apiVersionInitExecuted = false;
    objectId = 0;
    defaultPosition = { x: 0, y: 0, z: 0 };
    defaultRotation = { x: 0, y: 0, z: 0 };
    defaultScale = { x: 1, y: 1, z: 1 };
    defaultColor = { r: 255, g: 255, b: 255, a: 1 };
    communicationInterface;
    window;
    constructor(commInterface = 'vuplex', w = window) {
        this.window = w;
        this.communicationInterface = this.window[commInterface];
        if (this.communicationInterface == undefined
            || this.communicationInterface === ''
            || this.communicationInterface === null) {
            this.window.EnSpace = {
                ...this.window.EnSpace,
                environment: 'web-browser'
            };
            this.window.addEventListener('vuplexready', () => {
                this.communicationInterface = this.window[commInterface];
                this.initApiVersion();
                this.messageStack.forEach((message) => {
                    this.communicationInterface.postMessage(message);
                });
                this.messageStack = [];
                this.window.EnSpace = {
                    ...this.window.EnSpace,
                    environment: 'web-view'
                };
                this.window.console.log = debug_1.enLog;
                this.window.console.error = debug_1.enError;
                this.window.alert = debug_1.enAlert;
                this.window.onerror = debug_1.enOnWindowError;
            });
            this.communicationInterface = {};
            this.communicationInterface.postMessage = (message) => {
                this.messageStack.push(message);
            };
            this.communicationInterface.addEventListener = (message) => { };
        }
        else {
            this.window.EnSpace = {
                ...this.window.EnSpace,
                environment: 'web-view'
            };
            this.window.console.log = debug_1.enLog;
            this.window.console.error = debug_1.enError;
            this.window.alert = debug_1.enAlert;
            this.window.onerror = debug_1.enOnWindowError;
            this.initApiVersion();
        }
    }
    generateObjectId = () => {
        this.window.EnSpace.objectId++;
        return this.window.EnSpace.objectId;
    };
    getEnvironment = () => {
        return this.window.EnSpace.environment;
    };
    getApiVersion = () => {
        return this.window.EnSpace.apiVersion;
    };
    setApiVersion = (value) => {
        this.window.EnSpace.apiVersion = value;
    };
    initVersion = () => {
        this.communicationInterface.postMessage({
            name: "api-init",
            payload: {
                api: this.getApiVersion()
            }
        });
    };
    enableDebug = () => {
        this.window.EnSpace.debugMode = true;
    };
    disableDebug = () => {
        this.window.EnSpace.debugMode = false;
    };
    isDebugMode = () => {
        return this.window.EnSpace?.debugMode || false;
    };
    sendMessage = (message) => {
        this.communicationInterface.postMessage(message);
    };
    sendAction = (name, payload) => {
        if (name == undefined || name == null)
            throw new Error('[core][sendAction] - name is not defined');
        if (payload == undefined || payload == null)
            throw new Error('[core][sendAction] - payload is not defined');
        let jsonAction = this.createAction(name, payload);
        if (this.isDebugMode())
            console.log(jsonAction);
        this.communicationInterface.postMessage(jsonAction);
    };
    sendActions = (actionArray) => {
        if (actionArray == undefined
            || actionArray == null
            || typeof actionArray !== 'object'
            || actionArray.length == 0)
            throw new Error('[core][sendActions] - actionArray is not defined');
        var jsonAction = this.createAction('api-multi-action', actionArray);
        if (this.isDebugMode())
            console.log(jsonAction);
        this.communicationInterface.postMessage(jsonAction);
    };
    destroyObject = (objectId) => {
        this.sendAction('actor-destroy', {
            id: objectId
        });
    };
    destroyAll() {
        this.sendAction('actor-destroy-all', {});
    }
    playHaptic = () => {
        this.sendAction('device-play-haptic', {});
    };
    createAction = (actName, actPayload) => {
        if (actName == undefined || actName == null)
            throw new Error('[core][createAction] - actName is not defined');
        if (actPayload == undefined || actPayload == null)
            throw new Error('[core][createAction] - actPayload is not defined');
        var act = {
            name: actName,
            payload: actPayload
        };
        return act;
    };
    initApiVersion = () => {
        this.communicationInterface.postMessage({
            name: "api-init",
            payload: {
                api: "3"
            }
        });
    };
}
exports.EndymionCore = EndymionCoreV2;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnAsset = void 0;
const rxjs_1 = require("rxjs");
const en_base_entity_1 = require("./en-base-entity");
class EnAsset extends en_base_entity_1.BaseEntity {
    commInterface;
    w;
    type = 'gltf';
    animationIndex = -1;
    animationUpdated = new rxjs_1.Subject();
    animationPlaying = new rxjs_1.Subject();
    animationPaused = new rxjs_1.Subject();
    animationStopped = new rxjs_1.Subject();
    animationUpdated$ = this.animationUpdated.asObservable();
    animationPlaying$ = this.animationPlaying.asObservable();
    animationPaused$ = this.animationPaused.asObservable();
    animationStopped$ = this.animationStopped.asObservable();
    constructor(commInterface = 'vuplex', w = window) {
        super(commInterface, w);
        this.commInterface = commInterface;
        this.w = w;
        this.entity.primitive = this.type;
    }
    create() {
        throw new Error("s[en-asset][create]Method not allowed on EnAsset");
    }
    setColor(color) {
        throw new Error("[en-asset][setColor] - Method not allowed on EnAsset");
    }
    setOpacity(value) {
        throw new Error("[en-asset][setOpacity] - Method not allowed on EnAsset");
    }
    setAnim(animationIndex) {
        this.animationIndex = animationIndex;
        this.animationUpdated.next(animationIndex);
        return this;
    }
    playAnim() {
        if (this.animationIndex > -1) {
            this.actions.push({
                name: 'gltf-play-anim',
                payload: {
                    id: this.entity.id,
                    index: this.animationIndex
                }
            });
            this.apply();
            this.animationPlaying.next(true);
            this.animationPaused.next(false);
            this.animationStopped.next(false);
        }
    }
    stopAnim() {
        this.actions.push({
            name: 'gltf-stop-anim',
            payload: {
                id: this.entity.id
            }
        });
        this.apply();
        this.animationPlaying.next(false);
        this.animationPaused.next(false);
        this.animationStopped.next(true);
    }
    pauseAnim() {
        this.actions.push({
            name: 'gltf-pause-anim',
            payload: {
                id: this.entity.id
            }
        });
        this.apply();
        this.animationPlaying.next(false);
        this.animationPaused.next(true);
        this.animationStopped.next(false);
    }
    load(url) {
        url = url.includes('http')
            ? url
            : `${this.win.getCurrentProtocol()}//${this.win.getCurrentHost()}/${url}`;
        this.entity.id = this.isCustomId ? this.customId : this.id;
        this.actions = [
            {
                name: 'gltf-create',
                payload: {
                    id: this.entity.id,
                    url: url,
                    transform: {
                        position: this.entity.position,
                        rotation: this.entity.rotation,
                        scale: this.entity.scale
                    }
                }
            }
        ];
        super.create();
        return this;
    }
}
exports.EnAsset = EnAsset;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnCapsule = void 0;
const en_base_entity_1 = require("./en-base-entity");
class EnCapsule extends en_base_entity_1.BaseEntity {
    commInterface;
    w;
    type = 'capsule';
    constructor(commInterface = 'vuplex', w = window) {
        super(commInterface, w);
        this.commInterface = commInterface;
        this.w = w;
        this.entity.primitive = this.type;
    }
    create() {
        this.entity.id = this.id;
        this.actions = [
            {
                name: 'primitive-create', payload: {
                    id: this.entity.id,
                    primitive: this.entity.primitive,
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
exports.EnCapsule = EnCapsule;

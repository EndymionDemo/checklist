"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnPlane = void 0;
const en_base_entity_1 = require("./en-base-entity");
class EnPlane extends en_base_entity_1.BaseEntity {
    commInterface;
    w;
    type = 'plane';
    constructor(commInterface = 'vuplex', w = window) {
        super(commInterface, w);
        this.commInterface = commInterface;
        this.w = w;
        this.entity.primitive = this.type;
    }
    create() {
        this.entity.id = this.isCustomId ? this.customId : this.core.generateObjectId();
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
exports.EnPlane = EnPlane;

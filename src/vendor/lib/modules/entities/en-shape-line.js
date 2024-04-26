"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnShapeLine = void 0;
const en_base_entity_1 = require("./en-base-entity");
class EnShapeLine extends en_base_entity_1.BaseEntity {
    commInterface;
    w;
    type = 'shape-line';
    points = [{
            x: 0, y: 0, z: 0,
        }, {
            x: 10, y: 0, z: 0,
        }];
    thickness = 1;
    constructor(commInterface = 'vuplex', w = window) {
        super(commInterface, w);
        this.commInterface = commInterface;
        this.w = w;
        this.entity.primitive = this.type;
    }
    setPoints(points) {
        this.points = points;
        return this;
    }
    addPoint(point) {
        this.points.push(point);
        return this;
    }
    setThickness(thickness) {
        this.thickness = thickness;
        return this;
    }
    create() {
        this.entity.id = this.isCustomId ? this.customId : this.core.generateObjectId();
        this.actions = [
            {
                name: 'shape-line-create', payload: {
                    id: this.entity.id.toString(),
                    color: this.entity.color,
                    thickness: this.thickness,
                    points: this.points,
                    transform: {
                        position: this.entity.position,
                        rotation: this.entity.rotation,
                        scale: this.entity.scale
                    }
                }
            },
        ];
        super.create();
        return this;
    }
}
exports.EnShapeLine = EnShapeLine;

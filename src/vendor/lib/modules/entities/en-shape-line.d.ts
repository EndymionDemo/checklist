import { Coordinates, PrimitiveType } from "../endymion/endymion-v2.types";
import { BaseEntity } from "./en-base-entity";
export declare class EnShapeLine extends BaseEntity {
    protected commInterface: string;
    protected w: Window;
    type: PrimitiveType;
    private points;
    private thickness;
    constructor(commInterface?: string, w?: Window);
    setPoints(points: Coordinates[]): EnShapeLine;
    addPoint(point: Coordinates): EnShapeLine;
    setThickness(thickness: number): EnShapeLine;
    create(): EnShapeLine;
}

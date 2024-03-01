import { PrimitiveType } from "../endymion/endymion-v2.types";
import { BaseEntity } from "./en-base-entity";
export declare class EnCube extends BaseEntity {
    protected commInterface: string;
    protected w: Window;
    type: PrimitiveType;
    constructor(commInterface?: string, w?: Window);
    create(): EnCube;
}

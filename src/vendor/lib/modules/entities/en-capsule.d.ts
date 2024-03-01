import { PrimitiveType } from "../endymion/endymion-v2.types";
import { BaseEntity } from "./en-base-entity";
export declare class EnCapsule extends BaseEntity {
    protected commInterface: string;
    protected w: Window;
    type: PrimitiveType;
    constructor(commInterface?: string, w?: Window);
    create(): EnCapsule;
}

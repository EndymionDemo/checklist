import { Subject } from 'rxjs';
import { primitive, position, rotation, scale, TransformType, TransformGreatness, Color } from './endymion.types';
export declare class WebApi {
    vuplex: any;
    messageIn: Subject<unknown>;
    messageIn$: import("rxjs").Observable<unknown>;
    objectId: number;
    constructor();
    createAction: (actName: string, actPayload: any) => any;
    sendAction: (name: string, payload: any) => void;
    sendActions: (actionArray: any[]) => void;
    destroyObject: (objectId: number) => void;
    createObject: (objectId: number, primitive: primitive, position: position, rotation: rotation, scale: scale) => number;
    importGltf: (source: string) => {
        objectId: number;
        action: any;
    };
    updateTransform: (objectId: number, type: TransformType, greatness: TransformGreatness, value: position | rotation | scale) => {
        objectId: number;
        action: any;
    };
    setColor: (objectId: number, color: Color) => void;
    playHaptic(): void;
}

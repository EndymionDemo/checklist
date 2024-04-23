import { Position, Rotation, Scale, Color, ActionName, Action } from './endymion-v2.types';
declare class EndymionCoreV2 {
    private messageStack;
    private apiVerisionInitExecuted;
    protected objectId: number;
    protected defaultPosition: Position;
    protected defaultRotation: Rotation;
    protected defaultScale: Scale;
    protected defaultColor: Color;
    communicationInterface: any;
    window: Window;
    constructor(commInterface?: string, w?: Window);
    getObjectId: () => number;
    getEnvironment: () => string;
    getApiVersion: () => string;
    enableDebug: () => void;
    disableDebug: () => void;
    isDebugMode: () => boolean;
    sendMessage: (message: any) => void;
    sendAction: (name: ActionName, payload: any) => void;
    sendActions: (actionArray: Action[]) => void;
    destroyObject: (objectId: number | string) => void;
    destroyAll(): void;
    playHaptic: () => void;
    private createAction;
    private initApiVersion;
}
export { EndymionCoreV2 as EndymionCore };

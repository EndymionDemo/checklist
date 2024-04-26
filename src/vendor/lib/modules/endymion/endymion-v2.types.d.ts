export type PrimitiveType = 'cube' | 'sphere' | 'cylinder' | 'capsule' | 'plane' | 'quad' | 'gltf' | 'webview' | 'shape-line';
export type Position = {
    x: number;
    y: number;
    z: number;
};
export type Rotation = {
    x: number;
    y: number;
    z: number;
};
export type Scale = {
    x: number;
    y: number;
    z: number;
};
export type Coordinates = {
    x: number;
    y: number;
    z: number;
};
export type TransformType = 'delta' | 'absolute';
export type Transform = {
    position: Position;
    rotation: Rotation;
    scale: Scale;
};
export type TransformGreatness = 'position' | 'rotation' | 'scale';
export type Color = {
    r: number;
    g: number;
    b: number;
    a: number;
};
export type ActionName = 'api-multi-action' | 'actor-add-transform' | 'actor-set-transform' | 'actor-destroy' | 'actor-destroy-all' | 'actor-set-active' | 'actor-set-aimable' | 'actor-set-clickable' | 'device-play-haptic' | 'gltf-create' | 'gltf-play-anim' | 'gltf-pause-anim' | 'gltf-stop-anim' | 'primitive-create' | 'primitive-set-color' | 'shape-line-create' | 'webview-create' | 'tracker-add-image';
export type Entity = {
    id: number;
    primitive: PrimitiveType;
    position: Position;
    rotation: Rotation;
    scale: Scale;
    color: Color;
    clickable: boolean;
    active: boolean;
    aimable: boolean;
    playHaptic: boolean;
};
export interface Action {
    name: ActionName;
    payload: any;
}
export type message = {
    origin: string;
    data: any;
};
export type webviewParentTransform = 'p' | 'r' | 's' | 'pr' | 'ps' | 'rs' | 'prs';
export type webViewParent = {
    id: string;
    inherit_transform: webviewParentTransform | undefined;
} | undefined;
export type webViewType = 'persp' | 'flat-scaled' | 'flat-fixed' | 'screen-fixed';
export type webViewPayload = {
    id: string;
    url: string;
    parent: webViewParent;
};
export type actorSetActivePayload = {
    id: string;
    activated: boolean;
};
export type MessageName = 'actor-on-aim' | 'actor-on-click' | 'webview-visible' | 'api-on-result' | 'tracker-on-image';
export type MessagePayload = {
    id: string;
    state?: string | boolean;
};
export type MessageIncoming = {
    name: MessageName;
    type: string;
    payload: MessagePayload;
};

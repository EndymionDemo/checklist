import { Color, PrimitiveType } from "../endymion/endymion-v2.types";
import { BaseEntity } from "./en-base-entity";
export declare class EnAsset extends BaseEntity {
    protected commInterface: string;
    protected w: Window;
    type: PrimitiveType;
    private url;
    private animationIndex;
    private animationUpdated;
    private animationPlaying;
    private animationPaused;
    private animationStopped;
    animationUpdated$: import("rxjs").Observable<number>;
    animationPlaying$: import("rxjs").Observable<boolean>;
    animationPaused$: import("rxjs").Observable<boolean>;
    animationStopped$: import("rxjs").Observable<boolean>;
    constructor(commInterface?: string, w?: Window);
    create(): EnAsset;
    setColor(color: Color): BaseEntity;
    setOpacity(value: number): BaseEntity;
    setAnim(animationIndex: number): this;
    playAnim(): void;
    stopAnim(): void;
    pauseAnim(): void;
    load(url: string): EnAsset;
}

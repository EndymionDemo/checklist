import { Color, PrimitiveType, webViewParent as WebViewParent, webViewType } from "../endymion/endymion-v2.types";
import { BaseEntity } from "./en-base-entity";
export declare class EnWebview extends BaseEntity {
    protected commInterface: string;
    protected w: Window;
    type: PrimitiveType;
    webViewParent: WebViewParent;
    url: string;
    webViewType: webViewType;
    constructor(commInterface?: string, w?: Window);
    setColor(color: Color): BaseEntity;
    setOpacity(value: number): BaseEntity;
    setUrl(url: string): EnWebview;
    setParent(webViewParent: WebViewParent): EnWebview;
    setType(type: webViewType): EnWebview;
    create(): EnWebview;
}

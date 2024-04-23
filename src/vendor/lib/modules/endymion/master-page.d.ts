import { En } from "../endymion";
import { Transform } from "./endymion-v2.types";
export type Page = {
    name: string;
    url: string;
    transform: Transform | null;
    placeholder: {
        url: string;
        transform: Transform | null;
    };
    inherit_transform: string | null;
};
export declare class MasterPage {
    private en;
    pages: Page[];
    constructor(en: En);
    addPage(name: string, url: string, placeholderUrl: string, pageTransform: Transform | null, placeholderTransform?: Transform | null, inherit_transform?: string | null): void;
    addPages(pages: Page[]): void;
    addTrackingImage(imagePath: string): void;
    connect(): void;
}

export declare function checkValueForColor(value: string): boolean | {
    r: number;
    g: number;
    b: number;
    a: number;
};
export declare function hexToRGB(color: string): false | {
    r: string | number;
    g: string | number;
    b: string | number;
    a: number;
};
export declare function parsing(value: string): any;
export declare function h2d(h: string): number;
export declare const namedColor: () => Map<string, string>;
export declare function rgba(r: number, g: number, b: number, a: number): {
    r: number;
    g: number;
    b: number;
    a: number;
};
export declare function rgb(r: number, g: number, b: number): {
    r: number;
    g: number;
    b: number;
    a: number;
};

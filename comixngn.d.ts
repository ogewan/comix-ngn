export { Chapter, comixngn, Hexstring, Page, Schema, Version };
declare class Hexstring {
    value: number;
    toString: () => string;
    constructor(input: string | number);
}
declare class Version {
    major: number;
    minor: number;
    patch: number;
    constructor(major?: number, minor?: number, patch?: number);
    toString(): string;
}
declare class Page {
    url: string[];
    altText?: string;
    hover?: string;
    note?: string;
    title?: string;
    script?: string;
    absolute?: boolean;
    animate?: boolean;
    permanent?: boolean;
    release?: Date;
    constructor(input: string | string[] | null, config?: any);
    collapse(): string;
    toString(): string;
}
declare class Chapter {
    start: number;
    title?: string | undefined;
    description?: string | undefined;
    constructor(start: number, title?: string | undefined, description?: string | undefined);
    toString(): string;
}
declare class Schema {
    pages: Page[];
    chapters: Chapter[];
    config: {
        format: string;
        startDate: void | Date;
        chapterStartAt: number;
        pageStartAt: number;
        dir: string;
        imgpostbuffer: number;
        imgprebuffer: number;
        startPage: number;
        back: Hexstring;
    };
    loading: {
        diameter: number;
        lines: number;
        rate: number;
        back: Hexstring;
        color: Hexstring;
    };
    private pageChapterMap;
    constructor(script?: any);
    exportPages(ids?: number[]): string[];
    mapPageChapter(indicies?: number[]): void;
    pageToChapter(id?: number): number;
    chapterToPage(id?: number): number;
}
declare let comixngn: () => Comixngn;
declare class Comixngn {
    coreVersion: Version;
    cxxVersion: Version;
    bookMap: Map<string, CmxBook>;
    private _priority;
    private _sysmsg;
    private _sysclr;
    private _setting;
    readonly setting: any;
    private defRoute;
    private routing;
    constructor();
    priorityConfig(setting: any): void;
    config(setting: any, priority?: boolean): void;
    reset(): void;
}
declare class CmxBook extends HTMLElement {
    [key: string]: any;
    controller?: CmxCtrl;
    private _schema?;
    private _uid;
    private _cid;
    private _core;
    private _active;
    readonly core: Comixngn;
    shadow: ShadowRoot;
    constructor();
    private convertToDirectionSetting;
    private initializeDisplay;
    private initializeControls;
    private defineMethods;
    exportSchema(): string;
    changeId(key: string, value: string): void;
    uid: string;
    cid: string;
    schema: any;
    config: string | null;
    static readonly observedAttributes: string[];
    attributeChangedCallback(name: string, oldVal: string, newVal: string): void;
    rand(): number | void;
    go(to?: number): number | void;
    prev(): number | void;
    next(): number | void;
    frst(): number | void;
    last(): number | void;
    ch_go(to?: number): number | void;
    ch_prev(): number | void;
    ch_next(): number | void;
    ch_frst(): number | void;
    ch_last(): number | void;
    update(): void;
    current(): number | void;
    ch_current(): number | void;
    rawData(to?: number): any | void;
    pg_data(to?: number): Page | void;
    ch_data(to?: number): Chapter | void;
    setupShaders(options?: number): void;
}
declare class CmxCtrl extends HTMLElement {
    shadow: ShadowRoot;
    private _ctrlarray;
    private _book?;
    [key: string]: any;
    private makeButton;
    private btnAssign;
    constructor(book?: CmxBook, template?: any);
    static readonly observedAttributes: string[];
    attributeChangedCallback(name: string, oldVal: string, newVal: string): void;
    book: string;
    bookId(): string | undefined;
}

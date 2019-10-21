declare var cG: any;
interface page {
    alt: string;
    anim8: boolean;
    hover: string;
    note: string;
    perm: boolean;
    release: number;
    title: string;
    url: string[];
    special: string;
    absolute?: boolean;
}
interface chapter {
    description: string;
    end: number;
    start: number;
    title: string;
}
interface script {
    chapters: chapter[];
    config: {
        chapterstartnum: boolean;
        dir: string;
        imgpostbuffer: number;
        imgprebuffer: number;
        pagestartnum: boolean;
        startpage: number;
        back: string;
    };
    loading: {
        diameter: number;
        lines: number;
        rate: number;
        xpos: number;
        ypos: number;
        back: string;
        color: string;
    };
    offset: number;
    pages: page[];
    parent: any;
}
interface settings {
    overwrite?: boolean;
    anchor?: number;
    dir?: string;
    imgprebuffer?: number;
    imgpostbuffer?: number;
    back?: string;
    lines?: number;
    rate?: number;
    diameter?: number;
    loaderback?: string;
    color?: string;
}
interface direction {
    new (input: string | string[], config?: object): any;
}
/** @function setValid
 * @param element If element is null, void, empty string, or -1 it is unset or set to unset
 */
declare var setValid: (element: any) => boolean, 
/** @function smartAttrib
 * @param source
 * @param mapper
 * @param ignore
 */
smartAttrib: (source: Element, mapper: any, ig: number) => void, 
/** @function stick
 * @param obj
 * @param parent
 * @param sauce
 * @param pos
 */
stick: (obj: any, parent: any, sauce: any, pos: any) => any, 
/** @function FEbyIDAI
 * @param source
 * @param ids
 * @param inner
 */
FEbyIdAI: (source: any, ids: any, inner: any) => any, 
/** @function FindClassesInside
 * @param source
 * @param class
 */
FindClassesInside: (source: any, cls: any) => any, 
/** @function renameEles
 * @param bool
 * @param source
 * @param prepend
 * @param append
 */
renameEles: (bool: boolean, source: Element, prepend?: string | undefined, append?: string | undefined) => void;
interface page {
    alt: string;
    anim8: boolean;
    hover: string;
    note: string;
    perm: boolean;
    release: number;
    title: string;
    url: string[];
    special: string;
    absolute?: boolean;
}
interface chapter {
    description: string;
    end: number;
    start: number;
    title: string;
}
interface script {
    chapters: chapter[];
    config: {
        chapterstartnum: boolean;
        dir: string;
        imgpostbuffer: number;
        imgprebuffer: number;
        pagestartnum: boolean;
        startpage: number;
        back: string;
    };
    loading: {
        diameter: number;
        lines: number;
        rate: number;
        xpos: number;
        ypos: number;
        back: string;
        color: string;
    };
    offset: number;
    pages: page[];
    parent: any;
}
interface settings {
    overwrite?: boolean;
    anchor?: number;
    dir?: string;
    imgprebuffer?: number;
    imgpostbuffer?: number;
    back?: string;
    lines?: number;
    rate?: number;
    diameter?: number;
    loaderback?: string;
    color?: string;
}
declare class page {
    altText: string;
    animated: boolean;
    hover: string;
    note: string;
    permanent: boolean;
    release: number;
    title: string;
    url: string[];
    special: string;
    absolute?: boolean;
}
declare class chapter {
    description: string;
    end: number;
    start: number;
    title: string;
}
declare class schema {
    pages: page[];
    chapters: chapter[];
    config: {
        chapterstartnum: boolean;
        dir: string;
        imgpostbuffer: number;
        imgprebuffer: number;
        pagestartnum: boolean;
        startpage: number;
        back: string;
    };
    loading: {
        diameter: number;
        lines: number;
        rate: number;
        xpos: number;
        ypos: number;
        back: string;
        color: string;
    };
    offset: number;
    parent: any;
    constructor(script: string);
}
declare class version {
    major: number;
    minor: number;
    patch: number;
    constructor(major?: number, minor?: number, patch?: number);
    toString(): string;
}
declare class comixngn {
    coreVersion: version;
    cxxVersion: version;
    bookMap: Map<string, cmxBook>;
    constructor();
}
declare class cmxBook extends HTMLElement {
    comixngn: comixngn;
    cid: string;
    schema?: schema;
    controller?: cmxCtrl;
    keyId: string;
    constructor(comixngn: comixngn, cid: string, uid?: string);
}
declare class cmxCtrl extends HTMLElement {
    book: cmxBook;
    constructor();
}

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
declare var setValid: (element: any) => boolean, smartAttrib: (source: Element, mapper: any, ig: number) => void, stick: (obj: any, parent: any, sauce: any, pos: any) => any, FEbyIdAI: (source: any, ids: any, inner: any) => any, FindClassesInside: (source: any, cls: any) => any, renameEles: (bool: boolean, source: Element, prepend?: string | undefined, append?: string | undefined) => void;
